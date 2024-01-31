<script lang="ts">
	import Border from '$lib/components/commons/Border.svelte';
	import VtuberGrid from '$lib/components/layouts/VtuberGrid.svelte';
	import Modal from '$lib/components/modals/Modal.svelte';
	import { compactInt } from '$lib/utils/utils';
	import type { SvelteComponent } from 'svelte';
	import type { VtuberResponseData } from '../../../../api/vtubers/[id]/+server';

	let modal: SvelteComponent;
	let title: string = '';
	let birthdayData: VtuberResponseData[] = [];
	let anniversaryData: VtuberResponseData[] = [];

	export const toggleOpen = (
		date: string,
		birthday: VtuberResponseData[],
		anniversary: VtuberResponseData[]
	) => {
		title = date;
		birthdayData = birthday;
		anniversaryData = anniversary;
		modal.toggleOpen();
	};
</script>

<Modal bind:this={modal} class="max-w-md">
	<div slot="header" class="text-xl font-bold">{title}</div>

	<div slot="body" class="grid grid-cols-6 gap-4 p-4">
		{#if birthdayData.length > 0}
			<Border class="col-span-6">
				<span class="whitespace-nowrap px-4 font-bold text-primary">
					Birthday Event ({birthdayData.length.toLocaleString()})
				</span>
			</Border>
			{#each birthdayData as vtuber}
				<VtuberGrid
					class="col-span-2 text-sm"
					id={vtuber.id}
					name={vtuber.name}
					image={vtuber.image}
					label={compactInt(vtuber.subscriber)}
				/>
			{/each}
		{/if}
		{#if anniversaryData.length > 0}
			<Border class="col-span-6">
				<span class="whitespace-nowrap px-4 font-bold text-primary-dark">
					Anniversary Event ({anniversaryData.length.toLocaleString()})
				</span>
			</Border>
			{#each anniversaryData as vtuber}
				<VtuberGrid
					class="col-span-2 text-sm"
					id={vtuber.id}
					name={vtuber.name}
					image={vtuber.image}
					label={compactInt(vtuber.subscriber)}
				/>
			{/each}
		{/if}
	</div>
</Modal>
