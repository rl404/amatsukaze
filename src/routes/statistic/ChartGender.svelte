<script lang="ts">
	import type { vtubersResponseData } from './+page.server';
	import { DonutChart } from '@carbon/charts-svelte';
	import '@carbon/charts/styles.css';
	import { onMount, type SvelteComponent } from 'svelte';
	import StatsModal from '$lib/component/StatsModal.svelte';
	import { PUBLIC_VTUBER_WIKI_HOST } from '$env/static/public';

	export let data: Array<vtubersResponseData> = [];

	const MALE = 'Male';
	const FEMALE = 'Female';
	const OTHER = 'Other';

	const genderData = Object.entries(
		data.reduce(
			(res: { [gender: string]: number }, curr) => {
				if (curr.gender === '') return res;

				let g = OTHER;
				switch (curr.gender.toLowerCase()) {
					case MALE.toLowerCase():
						g = MALE;
						break;
					case FEMALE.toLowerCase():
						g = FEMALE;
						break;
				}

				if (!res[g]) res[g] = 0;
				res[g]++;

				return res;
			},
			{ [MALE]: 0, [FEMALE]: 0, [OTHER]: 0 }
		)
	).sort((a, b) => (a[1] < b[1] ? 1 : -1));

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
			chartData.group === OTHER
				? ![MALE.toLowerCase(), FEMALE.toLowerCase()].includes(d.gender.toLowerCase()) &&
				  d.gender !== ''
				: d.gender.toLowerCase() === chartData.group.toLowerCase()
		);
		modal.toggleModal();
	};
</script>

<div class="text-center font-bold">Count by Gender</div>

<DonutChart
	class="p-2"
	bind:chart
	data={genderData.map((d) => ({ group: d[0], value: d[1] }))}
	options={{
		resizable: true,
		legend: {
			alignment: 'center'
		},
		color: {
			scale: {
				[MALE]: 'rgb(202 138 4)',
				[FEMALE]: 'rgb(234 179 8)',
				[OTHER]: 'rgb(161 98 7)'
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
