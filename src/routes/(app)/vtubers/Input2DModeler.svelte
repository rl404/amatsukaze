<script lang="ts">
	import { onMount } from 'svelte';
	import axios from 'axios';
	import InputText from '$lib/components/inputs/InputText.svelte';

	export let value: string;

	let options: Array<string> = [];

	onMount(() => {
		axios
			.get(`/api/vtubers/character-2d-modelers`)
			.then((resp) => {
				options = [...options, ...resp.data.data];
			})
			.catch(() => {});
	});
</script>

<div>
	<label for="character2DModeler" class="block mb-2 font-medium">Character 2D Modeler</label>
	<InputText id="character2DModeler" placeholder="any" class="w-full pl-2" bind:value datalist={options} />
</div>
