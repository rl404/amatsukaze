<script lang="ts">
	import InputRange from '$lib/components/inputs/InputRange.svelte';

	export let values: Array<number>;
	export let minValue: number;
	export let maxValue: number;
</script>

<div>
	<label for="debutYear" class="block mb-2 font-medium">Debut Year</label>
	<InputRange id="debutYear" bind:values bind:minValue bind:maxValue />
</div>
