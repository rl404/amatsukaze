<script lang="ts">
	import { onMount } from 'svelte';
	import axios from 'axios';
	import InputText from '$lib/components/InputText.svelte';

	export let value: string;

	let options: Array<string> = [];

	onMount(() => {
		axios
			.get(`/api/vtubers/character-3d-modelers`)
			.then((resp) => {
				options = [...options, ...resp.data.data];
			})
			.catch(() => {});
	});
</script>

<div>
	<label for="character3DModeler" class="block mb-2 font-medium">Character 3D Modeler</label>
	<InputText id="character3DModeler" placeholder="all" class="w-full pl-2" bind:value datalist={options} />
</div>
