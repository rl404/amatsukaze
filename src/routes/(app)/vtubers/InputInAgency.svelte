<script lang="ts">
	import InputCheckbox from '$lib/components/inputs/InputCheckbox.svelte';

	export let inAgency: boolean | undefined;
</script>

<div class="grid gap-1">
	<label class="font-bold" for="agency">Agency</label>
	<InputCheckbox label="In Agency" bind:checked={inAgency} useIndeterminate />
</div>
