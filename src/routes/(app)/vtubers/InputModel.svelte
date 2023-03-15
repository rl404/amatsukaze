<script lang="ts">
	import InputCheckbox from '$lib/components/inputs/InputCheckbox.svelte';

	export let has2D: boolean | undefined;
	export let has3D: boolean | undefined;
</script>

<div>
	<div class="block mb-2 font-medium pointer-events-none">Model</div>

	<div class="flex gap-2 justify-center">
		<div class="w-full">
			<InputCheckbox label="2D Model" bind:state={has2D} useIndeterminate />
		</div>
		<div class="w-full">
			<InputCheckbox label="3D Model" bind:state={has3D} useIndeterminate />
		</div>
	</div>
</div>
