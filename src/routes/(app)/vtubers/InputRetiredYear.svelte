<script lang="ts">
	import InputRange from '$lib/components/inputs/InputRange.svelte';

	export let startRetiredYear: number;
	export let endRetiredYear: number;
	export let minValue: number;
	export let maxValue: number;

	$: startRetiredYear = values[0] === minValue ? 0 : values[0];
	$: endRetiredYear = values[1] === maxValue ? 0 : values[1];

	let values: number[] = [
		startRetiredYear === 0 ? minValue : startRetiredYear,
		endRetiredYear === 0 ? maxValue : endRetiredYear
	];
</script>

<div class="grid gap-1">
	<label for="retiredYear" class="font-bold">Retired Year</label>
	<InputRange id="retiredYear" bind:values {minValue} {maxValue} />
</div>
