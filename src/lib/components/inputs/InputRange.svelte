<script lang="ts">
	import RangeSlider from 'svelte-range-slider-pips';

	export let id: string;
	export let values: Array<number>;
	export let minValue: number;
	export let maxValue: number;
	export let step: number = 1;
	export let formatter: (v: number) => string = (v) => v.toString();
</script>

<RangeSlider {id} bind:values min={minValue} max={maxValue} range float pips {step} {formatter} />

<style lang="postcss">
	:global(.rangeSlider) {
		background-color: theme(colors.neutral[200]) !important;
	}

	:global(.dark .rangeSlider) {
		background-color: theme(colors.neutral[800]) !important;
	}

	:global(.rangeSlider > .rangeHandle) {
		width: theme(space[4]) !important;
		height: theme(space[4]) !important;
	}

	:global(.rangeSlider > .rangeBar) {
		background-color: theme(colors.pink[200]) !important;
	}

	:global(.dark .rangeSlider > .rangeBar) {
		background-color: theme(colors.indigo[200]) !important;
	}

	:global(.rangeSlider.focus > .rangeBar) {
		background-color: theme(colors.pink[400]) !important;
	}

	:global(.dark .rangeSlider.focus > .rangeBar) {
		background-color: theme(colors.indigo[400]) !important;
	}

	:global(.rangeSlider > .rangeHandle > .rangeNub),
	:global(.rangeSlider > .rangeHandle > .rangeFloat) {
		background-color: theme(colors.pink[500]) !important;
	}

	:global(.dark .rangeSlider > .rangeHandle > .rangeNub),
	:global(.dark .rangeSlider > .rangeHandle > .rangeFloat) {
		background-color: theme(colors.indigo[500]) !important;
	}

	:global(.rangeSlider > .rangeHandle:hover::before) {
		box-shadow: 0 0 0 8px theme(colors.pink[500]) !important;
	}

	:global(.dark .rangeSlider > .rangeHandle:hover::before) {
		box-shadow: 0 0 0 8px theme(colors.indigo[500]) !important;
	}

	:global(.rangeSlider > .rangeHandle.press::before),
	:global(.rangeSlider > .rangeHandle.press:hover::before) {
		box-shadow: 0 0 0 12px theme(colors.pink[500]) !important;
	}

	:global(.dark .rangeSlider > .rangeHandle.press::before),
	:global(.dark .rangeSlider > .rangeHandle.press:hover::before) {
		box-shadow: 0 0 0 12px theme(colors.indigo[500]) !important;
	}

	:global(.rangeSlider > .rangePips > .pip) {
		background-color: theme(colors.neutral[300]) !important;
	}

	:global(.dark .rangeSlider > .rangePips > .pip) {
		background-color: theme(colors.neutral[500]) !important;
	}

	:global(.rangeSlider > .rangePips > .pip.selected) {
		background-color: theme(colors.neutral[700]) !important;
	}

	:global(.dark .rangeSlider > .rangePips > .pip.selected) {
		background-color: white !important;
	}

	:global(.rangeSlider > .rangePips > .pip.in-range) {
		background-color: theme(colors.pink[500]) !important;
	}

	:global(.dark .rangeSlider > .rangePips > .pip.in-range) {
		background-color: theme(colors.indigo[500]) !important;
	}
</style>
