<script lang="ts">
	import Checkbox from '$lib/components/inputs/Checkbox.svelte';

	export let excludeActive: boolean;
	export let excludeRetired: boolean;

	let active: boolean = !excludeActive;
	let retired: boolean = !excludeRetired;

	$: (active, setExcludeActive());
	$: (retired, setExcludeRetired());
	$: (excludeActive, setActive());
	$: (excludeRetired, setRetired());

	const setActive = () => (active = !excludeActive);
	const setRetired = () => (retired = !excludeRetired);
	const setExcludeActive = () => (excludeActive = !active);
	const setExcludeRetired = () => (excludeRetired = !retired);
</script>

<div class="grid grid-cols-2 gap-2">
	<Checkbox bind:checked={active}>Active</Checkbox>
	<Checkbox bind:checked={retired}>Retired</Checkbox>
</div>
