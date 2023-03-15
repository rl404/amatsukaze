<script lang="ts">
	import InputCheckbox from '$lib/components/inputs/InputCheckbox.svelte';

	export let inAgency: boolean | undefined;
</script>

<div>
	<div class="block mb-2 font-medium pointer-events-none">Agency</div>
	<InputCheckbox label="In Agency" bind:state={inAgency} useIndeterminate />
</div>
