<script lang="ts">
	import Border from '$lib/components/commons/Border.svelte';
	import Image from '$lib/components/commons/Image.svelte';
	import Loading from '$lib/components/commons/Loading.svelte';
	import VtuberGrid from '$lib/components/layouts/VtuberGrid.svelte';
	import Modal from '$lib/components/modals/Modal.svelte';
	import type { VtuberSort } from '$lib/types';
	import { getAxiosError } from '$lib/utils/api';
	import { getWikiImg } from '$lib/utils/utils';
	import axios from 'axios';
	import type { SvelteComponent } from 'svelte';
	import type { VtuberResponseData } from '../../../routes/api/vtubers/[id]/+server';

	export let id: number;
	export let name: string;
	export let image: string;
	export let sort: VtuberSort = 'name';

	let modal: SvelteComponent;
	let data: VtuberResponseData[] = [];
	let loading: boolean = true;
	let error: string = '';

	export const toggleOpen = () => {
		modal.toggleOpen();

		data = [];
		loading = true;
		error = '';

		axios
			.get(`/api/vtubers?mode=simple&agency_id=${id}&sort=${sort}&limit=-1`)
			.then((resp) => (data = resp.data.data))
			.catch((err) => (error = getAxiosError(err)))
			.finally(() => (loading = false));
	};
</script>

<Modal bind:this={modal} class="max-w-md">
	<div slot="header" class="text-xl font-bold">
		<a href="/agencies/{id}/{name}" class="clickable">{name}</a>
	</div>

	<div slot="body" class="grid grid-cols-3 gap-4 p-4">
		<div class="col-span-3 h-52">
			<Image
				src={getWikiImg(image)}
				alt={name}
				class="h-full w-full rounded-lg border border-border bg-card object-contain object-center p-4 dark:border-border-dark dark:bg-card-dark"
			/>
		</div>
		<Border class="col-span-3">
			<span class="pointer-events-none whitespace-nowrap px-4 font-bold">
				Members ({data.length.toLocaleString()})
			</span>
		</Border>
		{#if loading}
			<div class="col-span-3"><Loading class="h-8 w-8" /></div>
		{:else if error !== ''}
			<div class="col-span-3 text-center text-red-500">{error}</div>
		{:else if data.length === 0}
			<div class="col-span-3 text-center">no vtubers found...</div>
		{:else}
			{#each data as vtuber}
				<VtuberGrid id={vtuber.id} name={vtuber.name} image={vtuber.image} class="text-sm" />
			{/each}
		{/if}
	</div>
</Modal>
