<script lang="ts">
	import type { vtubersResponseData } from './+page.server';
	import { DonutChart } from '@carbon/charts-svelte';
	import '@carbon/charts/styles.css';
	import { onMount, SvelteComponent } from 'svelte';
	import StatsModal from '$lib/component/StatsModal.svelte';
	import { PUBLIC_VTUBER_WIKI_HOST } from '$env/static/public';

	export let data: Array<vtubersResponseData> = [];

	const statusData = data.reduce(
		(res, curr) => {
			if (curr.retirement_date) {
				res.retired++;
			} else {
				res.active++;
			}
			return res;
		},
		{ active: 0, retired: 0 }
	);

	let chart: any;
	let modal: SvelteComponent;
	let modalTitle: string = '';
	let modalData: Array<vtubersResponseData> = [];

	$: chart && chart.services.events.addEventListener('pie-slice-click', onClick);

	onMount(() => {
		return () => {
			chart && chart.services.events.removeEventListener('pie-slice-click', onClick);
		};
	});

	const onClick = (e: any) => {
		const chartData = e.detail.datum.data;
		modalTitle = `${chartData.group} (${chartData.value.toLocaleString()})`;
		switch (chartData.group) {
			case 'Active':
				modalData = data.filter((d) => !d.retirement_date);
				break;
			case 'Retired':
				modalData = data.filter((d) => d.retirement_date);
				break;
		}
		modal.toggleModal();
	};
</script>

<div class="text-center font-bold">Count by Status</div>

<DonutChart
	class="p-2"
	bind:chart
	data={[
		{
			group: 'Active',
			value: statusData.active
		},
		{
			group: 'Retired',
			value: statusData.retired
		}
	]}
	options={{
		resizable: true,
		legend: {
			alignment: 'center'
		},
		color: {
			scale: {
				Active: '#eab308',
				Retired: '#713e12'
			}
		},
		toolbar: {
			enabled: false
		},
		donut: {
			center: {
				label: 'Count'
			},
			alignment: 'center'
		},
		height: '300px'
	}}
/>

<StatsModal title={modalTitle} bind:this={modal}>
	<div class="grid gap-2 grid-cols-10">
		{#each modalData as vtuber}
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
