<script lang="ts">
	import InputText from '$lib/components/inputs/InputText.svelte';

	export let value: string;
	export let options: Array<string>;
</script>

<div>
	<label for="character3DModeler" class="block mb-2 font-medium">Character 3D Modeler</label>
	<InputText id="character3DModeler" placeholder="any" class="w-full pl-2" bind:value datalist={options} />
</div>
