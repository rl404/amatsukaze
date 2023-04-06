<script lang="ts">
	import { onMount } from 'svelte';
	import type { vtuberResponseData } from '../../api/vtubers/[id]/+server';

	export let data: Array<vtuberResponseData>;

	let avgDays: number = 0;
	let avgYears: number = 0;

	onMount(() => {
		const sumCount = data.reduce(
			(res: { sum: number; count: number }, curr) => {
				if (!curr.debut_date) return res;
				const debut = new Date(curr.debut_date);
				const retired = !curr.retirement_date ? new Date() : new Date(curr.retirement_date);
				const diff = retired.getTime() - debut.getTime();
				res.sum += diff / (1000 * 3600 * 24);
				res.count++;
				return res;
			},
			{ sum: 0, count: 0 }
		);

		avgDays = sumCount.sum / sumCount.count;
		avgYears = avgDays / (30 * 12);
	});
</script>

<div class="text-center font-bold text-5xl" title={`${parseInt(avgDays.toFixed(0)).toLocaleString()} days`}>
	{parseFloat(avgYears.toFixed(1)).toLocaleString()} years
</div>
