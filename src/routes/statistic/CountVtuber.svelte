<script lang="ts">
	import { PUBLIC_VTUBER_WIKI_HOST } from '$env/static/public';
	import StatsModal from '$lib/component/StatsModal.svelte';
	import type { SvelteComponent } from 'svelte';
	import type { vtubersResponseData } from './+page.server';

	export let data: Array<vtubersResponseData> = [];

	data = data.sort((a, b) => (a.name > b.name ? 1 : -1));

	let modal: SvelteComponent;
</script>

<div class="text-center font-bold">Vtuber Count</div>
<div class="text-center font-bold text-5xl my-2">
	<button class="hover:text-yellow-500" on:click={modal.toggleModal}>
		{data.length.toLocaleString()}
	</button>
</div>

<StatsModal title={`Vtubers (${data.length.toLocaleString()})`} bind:this={modal}>
	<div class="grid gap-2 grid-cols-10">
		{#each data as vtuber}
			<div class="col-span-1">
				<span
					class="h-3 w-3 {vtuber.retirement_date
						? 'bg-yellow-800'
						: 'bg-yellow-500'} rounded-xl inline-block ml-2 mr-3"
				/>
			</div>
			<a
				href="{PUBLIC_VTUBER_WIKI_HOST}/wiki/{vtuber.name}"
				target="_blank"
				rel="noreferrer"
				class="col-span-9 hover:text-yellow-500">{vtuber.name}</a
			>
		{/each}
	</div>
</StatsModal>
