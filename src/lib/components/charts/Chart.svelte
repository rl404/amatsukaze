<script lang="ts">
	import type { ApexOptions } from 'apexcharts';
	import { onDestroy, onMount } from 'svelte';

	export let options: ApexOptions;

	let chart: any;
	let node: HTMLElement;

	$: options, updateOptions(options);

	onMount(async () => {
		const ApexCharts = (await import('apexcharts')).default;
		chart = new ApexCharts(node, options);
		chart.render();
	});

	onDestroy(() => chart && chart.destroy());

	export const updateOptions = (opts: ApexOptions) => chart && chart.updateOptions(opts);
</script>

<div bind:this={node} />
