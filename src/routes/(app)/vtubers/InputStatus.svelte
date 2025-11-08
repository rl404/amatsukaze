<script lang="ts">
	import { Checkbox } from 'flowbite-svelte';

	export let excludeActive: boolean;
	export let excludeRetired: boolean;

	let active: boolean = !excludeActive;
	let retired: boolean = !excludeRetired;

	$: active = !excludeActive;
	$: retired = !excludeRetired;

	const onActiveChange = (event: Event) => {
		const target = event.target as HTMLInputElement;
		active = !target.checked;
		excludeActive = !target.checked;
	};

	const onRetiredChange = (event: Event) => {
		const target = event.target as HTMLInputElement;
		retired = !target.checked;
		excludeRetired = !target.checked;
	};
</script>

<div class="grid grid-cols-2 gap-2">
	<Checkbox checked={active} onchange={onActiveChange}>Active</Checkbox>
	<Checkbox checked={retired} onchange={onRetiredChange}>Retired</Checkbox>
</div>
