<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import Head from '$lib/components/commons/Head.svelte';
	import Image from '$lib/components/commons/Image.svelte';
	import TextOutline from '$lib/components/commons/TextOutline.svelte';
	import EditIcon from '$lib/components/icons/EditIcon.svelte';
	import PlusIcon from '$lib/components/icons/PlusIcon.svelte';
	import { getAxiosError } from '$lib/utils/api';
	import { getWikiImg, mustArrayLen, toNumber, toURL } from '$lib/utils/utils';
	import axios from 'axios';
	import { Breadcrumb, BreadcrumbItem, Button, Card, Spinner, Tooltip } from 'flowbite-svelte';
	import type { VtuberResponseData } from '../../api/vtubers/[id]/+server';
	import BasicDetails from './BasicDetails.svelte';
	import Medias from './Medias.svelte';
	import PersonalDetails from './PersonalDetails.svelte';
	import SearchModal from './SearchModal.svelte';

	let ids: number[] = [0, 0, 0];
	let loading: boolean[] = [false, false, false];
	let error: string[] = ['', '', ''];
	let data: VtuberResponseData[] | any[] = [{}, {}, {}];

	let open: boolean = false;
	let modalData: { id: number; name: string; image: string }[] | any[] = [{}, {}, {}];

	afterNavigate(() => {
		const params = page.url.searchParams;

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
	});

	const toggleModal = () => {
		modalData = data.map((d) => ({
			id: d.id || 0,
			name: d.name || '',
			image: d.image || ''
		}));
		open = !open;
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
					<Button color="alternative" class="aspect-square w-1/2" onclick={toggleModal}>
						<PlusIcon class="size-5" />
					</Button>
					<Tooltip placement="bottom">Add vtuber to compare</Tooltip>
				{:else if loading[i] || !data[i].id}
					<div class="flex aspect-square w-1/2 items-center justify-center">
						<Spinner class="dark:text-gray-400" />
					</div>
				{:else if error[i] !== ''}
					<div class="flex aspect-square w-1/2 items-center justify-center text-red-500">
						{error[i]}
					</div>
				{:else}
					<Card
						class="group relative aspect-square w-1/2 hover:cursor-pointer"
						onclick={toggleModal}
					>
						<Image
							src={getWikiImg(data[i].image)}
							alt={data[i].name}
							class="size-full rounded-lg object-cover object-top"
						/>
						<div
							class="absolute top-1 right-1 opacity-0 transition-opacity group-hover:opacity-100"
						>
							<Button class="p-2" pill color="red">
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
			{:else}
				<div />
			{/if}
		{/each}
	</div>
	{#if ids.reduce((sum, id) => sum + id, 0) > 0}
		<BasicDetails {data} />
		<Medias {data} />
		<PersonalDetails {data} />
	{/if}
</div>

<SearchModal bind:open bind:modalData />
