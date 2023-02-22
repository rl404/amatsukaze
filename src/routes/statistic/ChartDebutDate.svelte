<script lang="ts">
	import type { vtubersResponseData } from './+page.server';
	import { ComboChart } from '@carbon/charts-svelte';
	import { onMount, SvelteComponent } from 'svelte';
	import StatsModal from '$lib/component/StatsModal.svelte';
	import { PUBLIC_VTUBER_WIKI_HOST } from '$env/static/public';

	export let data: Array<vtubersResponseData> = [];

	let debutCount = 0;
	let retireCount = 0;

	const debutDateData = Object.entries(
		data.reduce((res: { [year: number]: { [name: string]: number } }, curr) => {
			if (curr.debut_date && new Date(curr.debut_date)) {
				const year = new Date(curr.debut_date).getFullYear();
				if (!res[year]) res[year] = { debut: 0, retire: 0 };
				res[year].debut++;
			}

			if (curr.retirement_date && new Date(curr.retirement_date)) {
				const year = new Date(curr.retirement_date).getFullYear();
				if (!res[year]) res[year] = { debut: 0, retire: 0 };
				res[year].retire++;
			}
			return res;
		}, {})
	).reduce((res: Array<{ year: string; type: string; value: number; total: number }>, curr) => {
		if (curr[0] === '0') return res;
		res.push(
			{
				year: curr[0],
				type: 'Debut',
				value: curr[1].debut,
				total: 0
			},
			{
				year: curr[0],
				type: 'Retire',
				value: curr[1].retire,
				total: 0
			},
			{
				year: curr[0],
				type: 'Debut Total',
				value: 0,
				total: (debutCount += curr[1].debut)
			},
			{
				year: curr[0],
				type: 'Retire Total',
				value: 0,
				total: (retireCount += curr[1].retire)
			}
		);
		return res;
	}, []);

	let chart: any;
	let modal: SvelteComponent;
	let modalTitle: string = '';
	let modalData: Array<vtubersResponseData> = [];

	$: chart && chart.services.events.addEventListener('bar-click', onClick);
	$: chart && chart.services.events.addEventListener('scatter-click', onClick2);

	onMount(() => {
		return () => {
			chart && chart.services.events.removeEventListener('bar-click', onClick);
			chart && chart.services.events.removeEventListener('scatter-click', onClick2);
		};
	});

	const onClick = (e: any) => {
		const chartData = e.detail.datum;
		modalTitle = `${chartData.group === 'Debut' ? 'Debut' : 'Retired'} ${
			chartData.year
		} (${chartData.value.toLocaleString()})`;
		switch (chartData.group) {
			case 'Debut':
				modalData = data.filter(
					(d) =>
						d.debut_date &&
						new Date(d.debut_date) &&
						new Date(d.debut_date).getFullYear() == chartData.year
				);
				break;
			case 'Retire':
				modalData = data.filter(
					(d) =>
						d.retirement_date &&
						new Date(d.retirement_date) &&
						new Date(d.retirement_date).getFullYear() == chartData.year
				);
				break;
		}
		modal.toggleModal();
	};

	const onClick2 = (e: any) => {
		const chartData = e.detail.datum;
		modalTitle = `${chartData.group === 'Debut Total' ? 'Debut Total' : 'Retired Total'} ${
			chartData.year
		} (${chartData.total.toLocaleString()})`;
		switch (chartData.group) {
			case 'Debut Total':
				modalData = data.filter(
					(d) =>
						d.debut_date &&
						new Date(d.debut_date) &&
						new Date(d.debut_date).getFullYear() <= chartData.year
				);
				break;
			case 'Retire Total':
				modalData = data.filter(
					(d) =>
						d.retirement_date &&
						new Date(d.retirement_date) &&
						new Date(d.retirement_date).getFullYear() <= chartData.year
				);
				break;
		}
		modal.toggleModal();
	};
</script>

<div class="text-center font-bold">Count by Debut & Retirement Year</div>

<ComboChart
	class="p-2"
	bind:chart
	data={debutDateData.map((a) => {
		return {
			year: a.year,
			group: a.type,
			value: a.value,
			total: a.total
		};
	})}
	options={{
		resizable: true,
		curve: 'curveNatural',
		color: {
			pairing: {
				option: 2
			},
			scale: {
				Debut: '#eab308',
				Retire: '#713e12',
				'Debut Total': 'rgb(250 204 21)',
				'Retire Total': 'rgb(161 98 7)'
			}
		},
		toolbar: {
			enabled: false
		},
		axes: {
			left: {
				mapsTo: 'value',
				scaleType: 'linear',
				correspondingDatasets: ['Debut', 'Retire']
			},
			right: {
				mapsTo: 'total',
				scaleType: 'linear',
				correspondingDatasets: ['Debut Total', 'Retire Total']
			},
			bottom: {
				mapsTo: 'year',
				scaleType: 'labels',
				main: true
			}
		},
		comboChartTypes: [
			{
				type: 'grouped-bar',
				correspondingDatasets: ['Debut', 'Retire']
			},
			{
				type: 'line',
				correspondingDatasets: ['Debut Total', 'Retire Total']
			}
		],
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
