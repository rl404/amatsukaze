<script lang="ts">
	import type { vtubersResponseData } from './+page.server';
	import { BarChartSimple } from '@carbon/charts-svelte';
	import { onMount, type SvelteComponent } from 'svelte';
	import StatsModal from '$lib/component/StatsModal.svelte';
	import { PUBLIC_VTUBER_WIKI_HOST } from '$env/static/public';

	export let data: Array<vtubersResponseData> = [];

	const colors = [
		'rgb(254 252 232)',
		'rgb(254 249 195)',
		'rgb(254 240 138)',
		'rgb(253 224 71)',
		'rgb(250 204 21)',
		'rgb(234 179 8)',
		'rgb(202 138 4)',
		'rgb(161 98 7)',
		'rgb(133 77 14)',
		'rgb(113 63 18)'
	];

	const illustratorData = Object.entries(
		data.reduce((res: { [name: string]: number }, curr) => {
			curr.character_2d_modelers?.forEach((a) => {
				if (!res[a]) res[a] = 0;
				res[a]++;
			});
			return res;
		}, {})
	)
		.sort((a, b) => (a[1] < b[1] ? 1 : -1))
		.slice(0, 10)
		.sort((a, b) =>
			a[1] === b[1] ? (a[0].toLowerCase() < b[0].toLowerCase() ? 1 : -1) : a[1] > b[1] ? 1 : -1
		);

	let chart: any;
	let modal: SvelteComponent;
	let modalTitle: string = '';
	let modalData: Array<vtubersResponseData> = [];

	$: chart && chart.services.events.addEventListener('bar-click', onClick);

	onMount(() => {
		return () => {
			chart && chart.services.events.removeEventListener('bar-click', onClick);
		};
	});

	const onClick = (e: any) => {
		const chartData = e.detail.datum;
		modalTitle = `${chartData.group} (${chartData.value.toLocaleString()})`;
		modalData = data.filter((d) => d.character_2d_modelers?.find((a) => a === chartData.group));
		modal.toggleModal();
	};
</script>

<div class="text-center font-bold">2D Modeler</div>

<BarChartSimple
	class="p-2"
	bind:chart
	data={illustratorData.map((a) => {
		return {
			group: a[0],
			value: a[1]
		};
	})}
	options={{
		resizable: true,
		legend: {
			enabled: false
		},
		color: {
			scale: illustratorData.reduce((res, curr, i) => ({ ...res, [curr[0]]: colors[i] }), {})
		},
		toolbar: {
			enabled: false
		},
		axes: {
			left: {
				mapsTo: 'group',
				scaleType: 'labels'
			},
			bottom: {
				mapsTo: 'value'
			}
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
