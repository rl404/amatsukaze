<script lang="ts">
	import { onMount } from 'svelte';
	import InputRange from '$lib/components/inputs/InputRange.svelte';
	import axios from 'axios';

	export let values: Array<number>;
	export let minValue: number;
	export let maxValue: number;

	onMount(() => {
		const currentYear = new Date().getFullYear();
		maxValue = currentYear;
		values[1] = values[1] || currentYear;

		axios
			.get(`/api/vtubers?start_debut_year=1&sort=debut_date&limit=1`)
			.then((resp) => {
				minValue = new Date(resp.data.data[0].debut_date).getFullYear();
			})
			.catch(() => {
				minValue = 2000;
			});
	});
</script>

<div>
	<label for="debutYear" class="block mb-2 font-medium">Debut Year</label>
	<InputRange id="debutYear" bind:values bind:minValue bind:maxValue />
</div>
