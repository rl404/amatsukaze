<script lang="ts">
	import InputRange from '$lib/components/inputs/InputRange.svelte';

	export let startDebutYear: number;
	export let endDebutYear: number;
	export let minValue: number;
	export let maxValue: number;

	$: startDebutYear = values[0] === minValue ? 0 : values[0];
	$: endDebutYear = values[1] === maxValue ? 0 : values[1];
	$: startDebutYear, endDebutYear, setValues();

	let values: number[] = [
		startDebutYear === 0 ? minValue : startDebutYear,
		endDebutYear === 0 ? maxValue : endDebutYear
	];

	const setValues = () =>
		(values = [
			startDebutYear === 0 ? minValue : startDebutYear,
			endDebutYear === 0 ? maxValue : endDebutYear
		]);
</script>

<div class="grid gap-1">
	<label for="debutYear" class="font-bold">Debut Year</label>
	<InputRange id="debutYear" bind:values {minValue} {maxValue} />
</div>
