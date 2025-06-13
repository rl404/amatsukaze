<script lang="ts">
	import Checkbox from '$lib/components/inputs/Checkbox.svelte';
	import { Label } from 'flowbite-svelte';

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

<div class="grid grid-cols-2 gap-2">
	<Checkbox id="status_active" bind:checked={active}>
		<Label for="status_active">Active</Label>
	</Checkbox>
	<Checkbox id="status_retired" bind:checked={retired}>
		<Label for="status_retired">Retired</Label>
	</Checkbox>
</div>
