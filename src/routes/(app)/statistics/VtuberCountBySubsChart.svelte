<script lang="ts">
	import BarChart from '$lib/components/charts/BarChart.svelte';
	import type { vtuberResponseData } from '../../api/vtubers/[id]/+server';

	export let data: Array<vtuberResponseData>;

	const chartData: Array<{ name: string; value: number }> = Object.entries(
		data.reduce(
			(res, vtuber) => {
				const subs = vtuber.channels.reduce((max, c) => (c.subscriber > max ? c.subscriber : max), 0);
				if (subs < 1e5) {
					res['<100K']++;
				} else if (1e5 <= subs && subs < 5e5) {
					res['100K-500K']++;
				} else if (5e5 <= subs && subs < 1e6) {
					res['500K-1M']++;
				} else if (1e6 <= subs && subs < 5e6) {
					res['1M-5M']++;
				} else {
					res['>5M']++;
				}
				return res;
			},
			{
				'<100K': 0,
				'100K-500K': 0,
				'500K-1M': 0,
				'1M-5M': 0,
				'>5M': 0
			}
		)
	).map((d) => ({
		name: d[0],
		value: d[1]
	}));

	const onClick = (d: any) => {
		const i = d.detail;
		const key = Object.values(chartData)[i].name;

		let startSubs = 0;
		let endSubs = 0;
		switch (key) {
			case '<100K':
				endSubs = 1e5;
				break;
			case '100K-500K':
				startSubs = 1e5;
				endSubs = 5e5;
				break;
			case '500K-1M':
				startSubs = 5e5;
				endSubs = 1e6;
				break;
			case '1M-5M':
				startSubs = 1e6;
				endSubs = 5e6;
				break;
			case '>5M':
				startSubs = 5e6;
				endSubs = 0;
				break;
		}

		window.open(`/vtubers?start_subscriber=${startSubs}&end_subscriber=${endSubs}`, '_blank')?.focus();
	};
</script>

<BarChart data={chartData} on:clickArea={onClick} />
