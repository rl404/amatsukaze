<script lang="ts">
	import { goto } from '$app/navigation';
	import Image from '$lib/components/commons/Image.svelte';
	import MinusIcon from '$lib/components/icons/MinusIcon.svelte';
	import PlusIcon from '$lib/components/icons/PlusIcon.svelte';
	import { getAxiosError } from '$lib/utils/api';
	import { getWikiImg } from '$lib/utils/utils';
	import axios from 'axios';
	import { Button, Card, Modal, Search, Spinner } from 'flowbite-svelte';
	import type { VtuberResponseData } from '../../api/vtubers/[id]/+server';

	export let open: boolean;
	export let modalData: { id: number; name: string; image: string }[] | any[];

	let delayTimer: number;
	let query: string = '';
	let loading: boolean = false;
	let error: string = '';
	let vtubers: VtuberResponseData[] = [];

	const onInput = () => {
		vtubers = [];
		clearTimeout(delayTimer);
		delayTimer = setTimeout(() => {
			if (query.length < 3) return;
			onSearch();
		}, 500);
	};

	const onSearch = () => {
		loading = true;
		error = '';
		axios
			.get(`/api/vtubers?names=${query}&limit=18`)
			.then((resp) => (vtubers = resp.data.data))
			.catch((err) => (error = getAxiosError(err)))
			.finally(() => (loading = false));
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
		open = false;
		goto(`?ids=${modalData.map((d) => d.id ?? 0).join(',')}`);
	};
</script>

<Modal title="Vtuber List" bind:open size="lg">
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
						class="group border-primary-500 relative aspect-square max-w-36 hover:cursor-pointer"
						onclick={() => removeVtuber(i)}
					>
						<Image
							src={getWikiImg(data.image)}
							alt={data.name}
							class="h-full w-full rounded-lg object-cover object-top"
						/>
						<div
							class="h6 bg-primary-500 pointer-events-none absolute bottom-0 line-clamp-1 w-full rounded-b-lg p-0.5 text-center text-white"
						>
							{data.name}
						</div>
						<div
							class="absolute top-1 right-1 opacity-0 transition-opacity group-hover:opacity-100"
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
				disabled={loading}
				bind:value={query}
				oninput={onInput}
			/>
		</div>
		<div class="grid grid-cols-6 gap-2">
			{#if loading}
				<div class="col-span-6 text-center"><Spinner /></div>
			{:else if error !== ''}
				<div class="col-span-6 text-center text-red-500">{error}</div>
			{:else if query !== '' && vtubers.length === 0}
				<div class="col-span-6 text-center">No result...</div>
			{:else}
				{#each vtubers as vtuber}
					<Card
						title={vtuber.name}
						size="none"
						padding="none"
						class="group hover:!border-primary-500 relative col-span-2 aspect-square h-full w-full transition hover:cursor-pointer sm:col-span-1"
						onclick={() => addVtuber(vtuber)}
					>
						<Image
							src={getWikiImg(vtuber.image)}
							alt={vtuber.name}
							class="h-full w-full rounded-lg object-cover object-top"
						/>
						<div
							class="h6 bg-primary-500 pointer-events-none absolute bottom-0 line-clamp-1 w-full rounded-b-lg p-0.5 text-center text-white opacity-0 transition-opacity group-hover:opacity-100"
						>
							{vtuber.name}
						</div>
						<div
							class="absolute top-1 right-1 opacity-0 transition-opacity group-hover:opacity-100"
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
		<Button onclick={onCompare}>Compare</Button>
	</div>
</Modal>
