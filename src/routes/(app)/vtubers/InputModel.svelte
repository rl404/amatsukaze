<script lang="ts">
	import InputCheckbox from '$lib/components/inputs/InputCheckbox.svelte';

	export let has2D: boolean | undefined;
	export let has3D: boolean | undefined;
</script>

<div class="grid gap-1">
	<label class="font-bold" for="model">Model</label>
	<div id="model" class="grid grid-cols-2 gap-2">
		<InputCheckbox label="2D Model" checked={has2D} bind:state={has2D} useIndeterminate />
		<InputCheckbox label="3D Model" checked={has3D} bind:state={has3D} useIndeterminate />
	</div>
</div>
