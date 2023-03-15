<script lang="ts">
	import { onMount } from 'svelte';
	import axios from 'axios';
	import InputText from '$lib/components/inputs/InputText.svelte';
	import type { agencyResponseData } from '../../api/agencies/[id]/+server';

	export let value: string;

	let options: Array<string> = [];

	onMount(() => {
		axios
			.get(`/api/agencies`)
			.then((resp) => {
				options = [...options, ...resp.data.data.map((d: agencyResponseData) => d.name)];
			})
			.catch(() => {});
	});
</script>

<div>
	<label for="agency" class="block mb-2 font-medium">Agency</label>
	<InputText id="agency" placeholder="all" class="w-full pl-2" bind:value datalist={options} />
</div>
