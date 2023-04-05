<script lang="ts">
	import BarChart from '$lib/components/charts/BarChart.svelte';
	import type { vtuberResponseData } from '../../api/vtubers/[id]/+server';

	export let data: Array<vtuberResponseData>;

	const limits = [
		{ min: 0, max: 1e3, label: '<1K' },
		{ min: 1e3, max: 5e3, label: '1K-5K' },
		{ min: 5e3, max: 10e3, label: '5K-10K' },
		{ min: 10e3, max: 25e3, label: '10K-25K' },
		{ min: 25e3, max: 5e4, label: '25K-50K' },
		{ min: 5e4, max: 1e5, label: '50K-100K' },
		{ min: 1e5, max: 25e4, label: '100K-250K' },
		{ min: 25e4, max: 5e5, label: '250K-500K' },
		{ min: 5e5, max: 1e6, label: '500K-1M' },
		{ min: 1e6, max: 5e6, label: '1M-5M' },
		{ min: 5e6, max: 0, label: '>5M' }
	];

	const chartData: Array<{ name: string; value: number }> = Object.entries(
		data.reduce(
			(res, vtuber) => {
				const subs = vtuber.channels.reduce((max, c) => (c.subscriber > max ? c.subscriber : max), 0);
				let i = 0;
				for (i = 0; i < limits.length - 1; i++) {
					if (limits[i].min <= subs && limits[i].max > subs) break;
				}
				res[limits[i].label]++;
				return res;
			},
			limits.reduce((res, l) => ({ ...res, [l.label]: 0 }), {} as { [label: string]: number })
		)
	).map((d) => ({
		name: d[0],
		value: d[1]
	}));

	const onClick = (d: any) => {
		const i = d.detail;
		const limit = limits[i];
		window.open(`/vtubers?start_subscriber=${limit.min}&end_subscriber=${limit.max}&sort=-subscriber`, '_blank')?.focus();
	};
</script>

<BarChart data={chartData} on:clickArea={onClick} />
