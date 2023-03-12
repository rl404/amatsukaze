<script lang="ts">
	import { onMount } from 'svelte';
	import InputText from '$lib/components/inputs/InputText.svelte';
	import axios from 'axios';

	export let value: string;

	let options: Array<string> = [];

	onMount(() => {
		axios
			.get(`/api/vtubers/character-designers`)
			.then((resp) => {
				options = [...options, ...resp.data.data];
			})
			.catch(() => {});
	});
</script>

<div>
	<label for="characterDesigner" class="block mb-2 font-medium">Character Designer</label>
	<InputText id="characterDesigner" placeholder="all" class="w-full pl-2" bind:value datalist={options} />
</div>
