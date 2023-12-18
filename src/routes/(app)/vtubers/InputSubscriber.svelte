<script lang="ts">
	import InputRange from '$lib/components/inputs/InputRange.svelte';
	import { compactInt } from '$lib/utils/utils';
	export let startSubscriber: number;
	export let endSubscriber: number;
	export let minValue: number;
	export let maxValue: number;

	$: startSubscriber = values[0] === minValue ? 0 : values[0];
	$: endSubscriber = values[1] === maxValue ? 0 : values[1];

	let values: number[] = [
		startSubscriber === 0 ? minValue : startSubscriber,
		endSubscriber === 0 ? maxValue : endSubscriber
	];
</script>

<div class="grid gap-1">
	<label for="subscriber" class="font-bold">Subscriber</label>
	<InputRange
		id="subscriber"
		bind:values
		{minValue}
		{maxValue}
		step={2e5}
		formatter={(v) => compactInt(v)}
	/>
</div>
