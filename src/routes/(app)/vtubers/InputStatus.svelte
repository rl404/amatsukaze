<script lang="ts">
	import InputCheckbox from '$lib/components/inputs/InputCheckbox.svelte';

	export let excludeActive: boolean;
	export let excludeRetired: boolean;

	let active: boolean = !excludeActive;
	let retired: boolean = !excludeRetired;

	$: active, setExcludeActive();
	$: retired, setExcludeRetired();
	$: excludeActive, setActive();
	$: excludeRetired, setRetired();

	const setActive = () => (active = !excludeActive);
	const setRetired = () => (retired = !excludeRetired);
	const setExcludeActive = () => (excludeActive = !active);
	const setExcludeRetired = () => (excludeRetired = !retired);
</script>

<div class="grid gap-1">
	<label class="font-bold" for="status">Status</label>
	<div id="status" class="grid grid-cols-2 gap-2">
		<InputCheckbox label="Active" bind:checked={active} />
		<InputCheckbox label="Retired" bind:checked={retired} />
	</div>
</div>
