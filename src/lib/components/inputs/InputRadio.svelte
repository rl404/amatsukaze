<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let label: string;
	export let value: string;
	export let group: string;

	const dispatch = createEventDispatcher<{ change: null }>();

	const onChange = () => {
		dispatch('change');
	};
</script>

<div class="flex items-center gap-2">
	<input id={label} type="radio" {value} bind:group on:change={onChange} />
	<label for={label} class="font-medium">{label}</label>
</div>
