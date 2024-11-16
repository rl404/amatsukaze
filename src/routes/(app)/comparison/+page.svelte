<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Head from '$lib/components/commons/Head.svelte';
	import Image from '$lib/components/commons/Image.svelte';
	import TextOutline from '$lib/components/commons/TextOutline.svelte';
	import EditIcon from '$lib/components/icons/EditIcon.svelte';
	import MinusIcon from '$lib/components/icons/MinusIcon.svelte';
	import PlusIcon from '$lib/components/icons/PlusIcon.svelte';
	import { getAxiosError } from '$lib/utils/api';
	import { getWikiImg, mustArrayLen, toNumber, toURL } from '$lib/utils/utils';
	import axios from 'axios';
	import {
		Breadcrumb,
		BreadcrumbItem,
		Button,
		Card,
		Modal,
		Search,
		Spinner,
		Tooltip
	} from 'flowbite-svelte';
	import type { VtuberResponseData } from '../../api/vtubers/[id]/+server';
	import BasicDetails from './BasicDetails.svelte';
	import Medias from './Medias.svelte';
	import PersonalDetails from './PersonalDetails.svelte';

	let ids: number[] = [0, 0, 0];
	let loading: boolean[] = [false, false, false];
	let error: string[] = ['', '', ''];
	let data: VtuberResponseData[] | any[] = [{}, {}, {}];

	let modal: boolean = false;
	let modalData: { id: number; name: string; image: string }[] | any[] = [{}, {}, {}];

	let delayTimer: number;
	let searchQuery: string = '';
	let searchLoading: boolean = false;
	let searchError: string = '';
	let searchData: VtuberResponseData[] = [];

	$: $page && onURLChange();

	const onURLChange = () => {
		const params = $page.url.searchParams;

		ids = [
			...mustArrayLen(
				params.get('ids')
					? params
							.get('ids')
							?.split(',')
							.map((id) => toNumber(id))
					: [0, 0, 0],
				3,
				0
			)
		];

		ids.forEach((id, i) => {
			if (id === 0) {
				data[i] = {};
				return;
			}

			loading[i] = true;
			error[i] = '';

			axios
				.get(`/api/vtubers/${id}`)
				.then((resp) => (data[i] = { ...resp.data.data }))
				.catch((err) => (error[i] = getAxiosError(err)))
				.finally(() => (loading[i] = false));
		});
	};

	const toggleModal = () => {
		modalData = data.map((d) => ({
			id: d.id || 0,
			name: d.name || '',
			image: d.image || ''
		}));
		modal = !modal;
	};

	const onInput = () => {
		searchData = [];
		clearTimeout(delayTimer);
		delayTimer = setTimeout(() => {
			if (searchQuery.length < 3) return;
			onSearch();
		}, 500);
	};

	const onSearch = () => {
		searchLoading = true;
		searchError = '';
		axios
			.get(`/api/vtubers?names=${searchQuery}&limit=18`)
			.then((resp) => (searchData = resp.data.data))
			.catch((err) => (searchError = getAxiosError(err)))
			.finally(() => (searchLoading = false));
	};

	const addVtuber = (vtuber: VtuberResponseData) => {
		const exist = modalData.findIndex((d) => d.id === vtuber.id);
		if (exist !== -1) return;

		const i = modalData.findIndex((d) => d.id === 0);
		modalData[i] = {
			id: vtuber.id,
			name: vtuber.name,
			image: vtuber.image
		};
	};

	const removeVtuber = (i: number) => {
		modalData[i].id = 0;
	};

	const onCompare = () => {
		modal = false;
		goto(`?ids=${modalData.map((d) => d.id ?? 0).join(',')}`);
	};
</script>

<Head
	title="Vtuber Comparison"
	description="Compare your favorite vtubers by name, status, debut & retirement year, agency, designer, channel type, subscriber count, etc."
	image="/comparison.png"
/>

<div class="grid gap-4">
	<Breadcrumb>
		<BreadcrumbItem home href="/">Home</BreadcrumbItem>
		<BreadcrumbItem>Vtuber Comparison</BreadcrumbItem>
	</Breadcrumb>
	<div class="relative flex items-center">
		<TextOutline class="absolute -z-10 opacity-20">Vtuber Comparison</TextOutline>
		<h1 class="h1">Vtuber Comparison</h1>
	</div>
	<div class="grid grid-cols-3 gap-4">
		{#each ids as id, i}
			<div class="flex items-center justify-center">
				{#if id === 0}
					<Button color="alternative" class="aspect-square w-1/2" on:click={toggleModal}>
						<PlusIcon class="size-5" />
					</Button>
					<Tooltip placement="bottom">Add vtuber to compare</Tooltip>
				{:else if loading[i] || !data[i].id}
					<div class="flex aspect-square w-1/2 items-center justify-center">
						<Spinner />
					</div>
				{:else if error[i] !== ''}
					<div class="flex aspect-square w-1/2 items-center justify-center text-red-500">
						{searchError}
					</div>
				{:else}
					<Card
						size="none"
						padding="none"
						class="group relative aspect-square w-1/2 hover:cursor-pointer"
						on:click={toggleModal}
					>
						<Image
							src={getWikiImg(data[i].image)}
							alt={data[i].name}
							class="h-full w-full rounded-lg object-cover object-top"
						/>
						<div
							class="absolute right-1 top-1 opacity-0 transition-opacity group-hover:opacity-100"
						>
							<Button class="!p-2" pill color="red">
								<EditIcon class="size-3" />
							</Button>
						</div>
					</Card>
				{/if}
			</div>
		{/each}
		{#each data as vtuber}
			{#if vtuber.id}
				<a class="h3 clickable text-center" href="/vtubers/{vtuber.id}/{toURL(vtuber.name)}">
					{vtuber.name}
					{vtuber.emoji}
				</a>
			{/if}
		{/each}
	</div>
	{#if ids.reduce((sum, id) => sum + id, 0) > 0}
		<BasicDetails {data} />
		<Medias {data} />
		<PersonalDetails {data} />
	{/if}
</div>

<Modal title="Vtuber List" bind:open={modal} size="lg">
	<div class="grid gap-4">
		<div class="flex items-center justify-center gap-4">
			{#each modalData as data, i}
				{#if data.id === 0}
					<Card class="aspect-square max-w-36"></Card>
				{:else}
					<Card
						title={data.name}
						size="none"
						padding="none"
						class="group relative aspect-square max-w-36 border-primary-500 hover:cursor-pointer"
						on:click={() => removeVtuber(i)}
					>
						<Image
							src={getWikiImg(data.image)}
							alt={data.name}
							class="h-full w-full rounded-lg object-cover object-top"
						/>
						<div
							class="h6 pointer-events-none absolute bottom-0 line-clamp-1 w-full rounded-b-lg bg-primary-500 p-0.5 text-center text-white"
						>
							{data.name}
						</div>
						<div
							class="absolute right-1 top-1 opacity-0 transition-opacity group-hover:opacity-100"
						>
							<Button class="!p-2" pill color="red">
								<MinusIcon class="size-3" />
							</Button>
						</div>
					</Card>
				{/if}
			{/each}
		</div>
		<div>
			<Search
				size="md"
				placeholder="vtuber name..."
				disabled={searchLoading}
				bind:value={searchQuery}
				on:input={onInput}
			/>
		</div>
		<div class="grid grid-cols-6 gap-2">
			{#if searchLoading}
				<div class="col-span-6 text-center"><Spinner /></div>
			{:else if searchError !== ''}
				<div class="col-span-6 text-center text-red-500">{searchError}</div>
			{:else if searchQuery !== '' && searchData.length === 0}
				<div class="col-span-6 text-center">No result...</div>
			{:else}
				{#each searchData as vtuber}
					<Card
						title={vtuber.name}
						size="none"
						padding="none"
						class="group relative aspect-square h-full w-full transition hover:cursor-pointer hover:!border-primary-500"
						on:click={() => addVtuber(vtuber)}
					>
						<Image
							src={getWikiImg(vtuber.image)}
							alt={vtuber.name}
							class="h-full w-full rounded-lg object-cover object-top"
						/>
						<div
							class="h6 pointer-events-none absolute bottom-0 line-clamp-1 w-full rounded-b-lg bg-primary-500 p-0.5 text-center text-white opacity-0 transition-opacity group-hover:opacity-100"
						>
							{vtuber.name}
						</div>
						<div
							class="absolute right-1 top-1 opacity-0 transition-opacity group-hover:opacity-100"
						>
							<Button class="!p-2" pill>
								<PlusIcon class="size-3" />
							</Button>
						</div>
					</Card>
				{/each}
			{/if}
		</div>
	</div>
	<div slot="footer" class="flex w-full items-start justify-end">
		<Button on:click={onCompare}>Compare</Button>
	</div>
</Modal>
