<script lang="ts">
	import type { vtuberResponseData } from '../../api/vtubers/[id]/+server';

	export let data: Array<vtuberResponseData>;

	const sumCount = data.reduce(
		(res: { sum: number; count: number }, curr) => {
			if (!curr.height || curr.height <= 0) return res;
			res.sum += curr.height;
			res.count++;
			return res;
		},
		{ sum: 0, count: 0 }
	);

	const avg = sumCount.sum / sumCount.count;
</script>

<div class="text-center font-bold text-5xl">
	{avg.toFixed(0)} cm
</div>
