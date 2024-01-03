<script lang="ts">
	import VtuberGrid from '$lib/components/layouts/VtuberGrid.svelte';
	import Timeline from '$lib/components/timelines/Timeline.svelte';
	import TimelineItem from '$lib/components/timelines/TimelineItem.svelte';
	import type { VtuberSort } from '$lib/types';
	import { MonthNames } from '$lib/utils/const';
	import type { VtuberResponseData } from '../../../../api/vtubers/[id]/+server';

	export let data: VtuberResponseData[];
	export let sort: VtuberSort;

	type TimelineCount = { id: string; debut: VtuberResponseData[]; retired: VtuberResponseData[] };
	type TimelineData = { [date: string]: TimelineCount };

	let timelineData: [string, TimelineCount][] = [];

	$: sort,
		(timelineData = Object.entries(
			data.reduce((res: TimelineData, vtuber: VtuberResponseData): TimelineData => {
				if (!vtuber.debut_date || !new Date(vtuber.debut_date)) {
					if (!res[-1]) res[-1] = { id: '', debut: [], retired: [] };
					res[-1].debut.push(vtuber);
				} else {
					const debutDate = new Date(vtuber.debut_date).toISOString();
					const yearMonth = `${debutDate.slice(0, 7)}-01`;
					if (!res[yearMonth]) res[yearMonth] = { id: yearMonth, debut: [], retired: [] };
					res[yearMonth].debut.push(vtuber);
				}

				if (!vtuber.retirement_date) return res;

				if (!new Date(vtuber.retirement_date)) {
					if (!res[-1]) res[-1] = { id: '', debut: [], retired: [] };
					res[-1].retired.push(vtuber);
				} else {
					const retiredDate = new Date(vtuber.retirement_date).toISOString();
					const yearMonth = `${retiredDate.slice(0, 7)}-01`;
					if (!res[yearMonth]) res[yearMonth] = { id: yearMonth, debut: [], retired: [] };
					res[yearMonth].retired.push(vtuber);
				}

				return res;
			}, {})
		)
			.sort((a, b) => {
				const da = new Date(a[0]);
				const db = new Date(b[0]);
				if (isNaN(da.getTime())) return 1;
				if (isNaN(db.getTime())) return -1;
				if (sort[0] !== '-') return da < db ? -1 : 1;
				return da > db ? -1 : 1;
			})
			.map((v) => {
				const d = new Date(v[0]);
				v[0] = isNaN(d.getTime()) ? 'Unknown' : `${MonthNames[d.getMonth()]} ${d.getFullYear()}`;
				return v;
			}));
</script>

<Timeline>
	{#each timelineData as d}
		<TimelineItem id={d[1].id}>
			<div
				slot="dot"
				class="h-3 w-3 rounded-full bg-gradient-to-t md:bg-gradient-to-r
      {d[1].retired.length > 0 ? 'from-red-500' : 'from-green-500'}
      {d[1].debut.length > 0 ? 'to-green-500' : 'to-red-500'}"
			/>

			<div slot="left" class="flex flex-col gap-2 p-4" class:hidden={d[1].retired.length === 0}>
				<div
					class="subtitle pointer-events-none flex gap-1 text-lg font-bold md:flex-row-reverse md:text-right"
				>
					<span class="text-red-500">Retired</span>
					<span>({d[1].retired.length.toLocaleString()})</span>
					<span>—</span>
					<span>{d[0]}</span>
				</div>
				<div class="ltr md:rtl grid grid-cols-3 gap-2">
					{#each d[1].retired as vtuber}
						<VtuberGrid
							class="col-span-1 text-sm"
							id={vtuber.id}
							name={vtuber.name}
							image={vtuber.image}
							itemprop="member"
						/>
					{/each}
				</div>
			</div>

			<div slot="right" class="flex flex-col gap-2 p-4" class:hidden={d[1].debut.length === 0}>
				<div class="subtitle pointer-events-none flex gap-1 text-lg font-bold">
					<span class="text-green-500">Debut</span>
					<span>({d[1].debut.length.toLocaleString()})</span>
					<span>—</span>
					<span>{d[0]}</span>
				</div>
				<div class="grid grid-cols-3 gap-2">
					{#each d[1].debut as vtuber}
						<VtuberGrid
							class="col-span-1 text-sm"
							id={vtuber.id}
							name={vtuber.name}
							image={vtuber.image}
							itemprop="member"
						/>
					{/each}
				</div>
			</div>
		</TimelineItem>
	{/each}
</Timeline>
