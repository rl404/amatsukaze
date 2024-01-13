<script lang="ts">
	import InputRange from '$lib/components/inputs/InputRange.svelte';

	export let startVideoCount: number;
	export let endVideoCount: number;
	const minValue: number = 0;
	const maxValue: number = 120;

	$: startVideoCount = values[0] === minValue ? 0 : values[0];
	$: endVideoCount = values[1] === maxValue ? 0 : values[1];
	$: startVideoCount, endVideoCount, setValues();

	let values: number[] = [
		startVideoCount === 0 ? minValue : startVideoCount,
		endVideoCount === 0 ? maxValue : endVideoCount
	];

	const setValues = () =>
		(values = [
			startVideoCount === 0 ? minValue : startVideoCount,
			endVideoCount === 0 ? maxValue : endVideoCount
		]);
</script>

<div class="grid gap-1">
	<label for="videoCount" class="font-bold" title="in the last 2 months">Video Count</label>
	<InputRange id="videoCount" bind:values {minValue} {maxValue} step={10} />
</div>
