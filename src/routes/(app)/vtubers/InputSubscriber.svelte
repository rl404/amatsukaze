<script lang="ts">
	import InputRange from '$lib/components/inputs/InputRange.svelte';
	import { compactInt } from '$lib/utils';

	export let values: Array<number>;
	export let minValue: number;
	export let maxValue: number;
</script>

<div>
	<label for="subscriber" class="block mb-2 font-medium">Subscriber</label>
	<InputRange id="subscriber" bind:values bind:minValue bind:maxValue step={2e5} formatter={(v) => compactInt(v)} />
</div>
