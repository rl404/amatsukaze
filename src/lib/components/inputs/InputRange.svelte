<script lang="ts">
	import RangeSlider from 'svelte-range-slider-pips';

	export let id: string;
	export let values: number[];
	export let minValue: number;
	export let maxValue: number;
	export let step: number = 1;
	export let formatter: (v: number) => string = (v) => v.toString();
</script>

<RangeSlider {id} bind:values min={minValue} max={maxValue} range float pips {step} {formatter} />
