<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type { ApexOptions } from 'apexcharts';

	export let options: ApexOptions;

	let chartNode: HTMLElement;
	let chart: any;

	onMount(async () => {
		const ApexCharts = (await import('apexcharts')).default;
		chart = new ApexCharts(chartNode, options);
		chart.render();
	});

	$: if (chart && options) chart.updateOptions(options);

	onDestroy(() => {
		if (chart) chart.destroy();
	});
</script>

<div bind:this={chartNode} />
