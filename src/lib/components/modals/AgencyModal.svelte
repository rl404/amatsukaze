<script lang="ts">
	import { getAxiosError } from '$lib/utils';
	import axios from 'axios';
	import type { SvelteComponent } from 'svelte';
	import type { vtuberResponseData } from '../../../routes/api/vtubers/[id]/+server';
	import Border from '../Border.svelte';
	import Image from '../Image.svelte';
	import VtuberGrid from '../layouts/VtuberGrid.svelte';
	import VtuberGridLoading from '../layouts/VtuberGridLoading.svelte';
	import Modal from './Modal.svelte';

	export let id: number = 0;
	export let title: string = '';
	export let image: string = '';

	let modal: SvelteComponent;
	let data: Array<vtuberResponseData> = [];
	let loading: boolean = true;
	let error: string = '';

	export const toggleOpen = () => {
		modal.toggleOpen();

		axios
			.get(`/api/vtubers?agency=${title}&limit=-1`)
			.then((resp) => {
				data = resp.data.data;
			})
			.catch((err) => {
				error = getAxiosError(err);
			})
			.finally(() => {
				loading = false;
			});
	};
</script>

<Modal bind:this={modal}>
	<span slot="title">
		<a href="/agencies/{id}/{title}" target="_blank" rel="noreferrer">{title}</a>
	</span>

	<div slot="body" class="p-4">
		<div class="grid grid-cols-3 gap-4">
			<div class="col-span-3 h-52">
				<Image
					src={image && `/api/wikia/image/${image.split('?')[0]}?height=206`}
					alt={title}
					class="p-4 m-auto h-52 object-contain object-center rounded-lg border dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-800"
				/>
			</div>
			<Border class="col-span-3">
				<span class="px-4 whitespace-nowrap font-bold">Members ({data.length.toLocaleString()})</span>
			</Border>
			{#if loading}
				{#each Array(6) as _}
					<VtuberGridLoading class="col-span-1" />
				{/each}
			{:else if error !== ''}
				<div class="col-span-3 text-red-500 text-center">
					{error}
				</div>
			{:else}
				{#each data as vtuber}
					<VtuberGrid class="col-span-1" id={vtuber.id} name={vtuber.name} image={vtuber.image} height={206} />
				{/each}
			{/if}
		</div>
	</div>
</Modal>
