<script lang="ts">
	import { PUBLIC_VTUBER_WIKI_HOST } from '$env/static/public';
	import StatsModal from '$lib/component/StatsModal.svelte';
	import type { SvelteComponent } from 'svelte';
	import type { vtubersResponseData } from './+page.server';

	export let data: Array<vtubersResponseData> = [];

	const agencies = data
		.reduce((res: Array<string>, curr) => {
			curr.agencies?.forEach((a) => {
				if (!res.find((r) => r === a.name)) {
					res.push(a.name);
				}
			});
			return res;
		}, [])
		.sort((a, b) => (a > b ? 1 : -1));

	let modal: SvelteComponent;
</script>

<div class="text-center font-bold">Agency Count</div>
<div class="text-center font-bold text-5xl my-2">
	<button class="hover:text-yellow-500" on:click={modal.toggleModal}>
		{agencies.length.toLocaleString()}
	</button>
</div>

<StatsModal title={`Agencies (${agencies.length.toLocaleString()})`} bind:this={modal}>
	<div class="grid gap-2">
		{#each agencies as agency}
			<div>
				<a
					href="{PUBLIC_VTUBER_WIKI_HOST}/wiki/{agency}"
					target="_blank"
					rel="noreferrer"
					class="hover:text-yellow-500">{agency}</a
				>
			</div>
		{/each}
	</div>
</StatsModal>
