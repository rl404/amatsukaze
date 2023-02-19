<script lang="ts">
	import type { vtubersResponseData } from './+page.server';
	import { DonutChart } from '@carbon/charts-svelte';
	import '@carbon/charts/styles.css';
	import { onMount, type SvelteComponent } from 'svelte';
	import StatsModal from '$lib/component/StatsModal.svelte';
	import { PUBLIC_VTUBER_WIKI_HOST } from '$env/static/public';

	export let data: Array<vtubersResponseData> = [];

	const TOP_COUNT = 12;

	const colors = [
		'rgb(253 224 71)',
		'rgb(250 204 21)',
		'rgb(234 179 8)',
		'rgb(202 138 4)',
		'rgb(161 98 7)',
		'rgb(133 77 14)',
		'rgb(113 63 18)',
		'rgb(120 53 15)',
		'rgb(146 64 14)',
		'rgb(180 83 9)',
		'rgb(217 119 6)',
		'rgb(245 158 11)',
		'rgb(251 191 36)'
	];

	const zodiacData = Object.entries(
		data.reduce((res: { [zodiac: string]: number }, curr) => {
			if (curr.zodiac_sign === '') return res;
			if (!res[curr.zodiac_sign]) res[curr.zodiac_sign] = 0;
			res[curr.zodiac_sign]++;
			return res;
		}, {})
	).sort((a, b) => (a[1] < b[1] ? 1 : -1));

	const topZodiacs = zodiacData.slice(0, TOP_COUNT).map((d) => d[0]);

	const otherZodiacCount = zodiacData.reduce((res, curr) => {
		if (!topZodiacs.includes(curr[0])) res += curr[1];
		return res;
	}, 0);

	let topZodiacData = zodiacData.slice(0, TOP_COUNT);
	topZodiacData.push(['Other', otherZodiacCount]);

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
		modalData = data.filter((d) =>
			chartData.group === 'Other'
				? !topZodiacs.includes(d.zodiac_sign) && d.zodiac_sign !== ''
				: d.zodiac_sign === chartData.group
		);
		modal.toggleModal();
	};
</script>

<div class="text-center font-bold">Count by Zodiac Sign</div>

<DonutChart
	class="p-2"
	bind:chart
	data={topZodiacData.map((d) => ({ group: d[0], value: d[1] }))}
	options={{
		resizable: true,
		legend: {
			alignment: 'center'
		},
		color: {
			scale: topZodiacData.reduce((res, curr, i) => ({ ...res, [curr[0]]: colors[i] }), {})
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
