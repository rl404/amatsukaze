<script lang="ts">
	import VtuberGrid from '$lib/components/layouts/VtuberGrid.svelte';
	import Timeline from '$lib/components/timelines/Timeline.svelte';
	import TimelineItem from '$lib/components/timelines/TimelineItem.svelte';
	import { isScreen, monthNames } from '$lib/utils';
	import type { vtuberResponseData } from '../../../api/vtubers/[id]/+server';

	export let data: Array<vtuberResponseData>;

	type timelineData = { [date: string]: { debut: Array<vtuberResponseData>; retired: Array<vtuberResponseData> } };

	let timelineVtubers = Object.entries(
		data.reduce((res: timelineData, vtuber: vtuberResponseData): timelineData => {
			if (!vtuber.debut_date || !new Date(vtuber.debut_date)) {
				if (!res[-1]) res[-1] = { debut: [], retired: [] };
				res[-1].debut.push(vtuber);
			} else {
				const debutDate = new Date(vtuber.debut_date).toISOString();
				const yearMonth = `${debutDate.slice(0, 7)}-01`;
				if (!res[yearMonth]) res[yearMonth] = { debut: [], retired: [] };
				res[yearMonth].debut.push(vtuber);
			}

			if (!vtuber.retirement_date) return res;

			if (!new Date(vtuber.retirement_date)) {
				if (!res[-1]) res[-1] = { debut: [], retired: [] };
				res[-1].retired.push(vtuber);
			} else {
				const retiredDate = new Date(vtuber.retirement_date).toISOString();
				const yearMonth = `${retiredDate.slice(0, 7)}-01`;
				if (!res[yearMonth]) res[yearMonth] = { debut: [], retired: [] };
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
			return da < db ? -1 : 1;
		})
		.map((v) => {
			const d = new Date(v[0]);
			v[0] = isNaN(d.getTime()) ? 'Unknown' : `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
			return v;
		});

	$: isMD = isScreen('md');

	const updateIsMD = () => {
		isMD = isScreen('md');
	};
</script>

<svelte:window on:resize={updateIsMD} />

<Timeline>
	{#each timelineVtubers as timelineVtuber}
		<TimelineItem
			dotClass="top-6 bg-gradient-to-t md:bg-gradient-to-r
      {timelineVtuber[1].retired.length > 0 ? 'from-red-500' : 'from-green-500'}
      {timelineVtuber[1].debut.length > 0 ? 'to-green-500' : 'to-red-500'}"
			leftClass="order-2 md:order-1"
			rightClass="order-1 md:order-2"
		>
			<div slot="left" class="p-4 flex flex-col gap-2" class:hidden={timelineVtuber[1].retired.length === 0}>
				<div class="flex gap-1 md:flex-row-reverse md:text-right text-lg font-bold text-neutral-400 dark:text-neutral-600 pointer-events-none">
					<span class="text-red-500">Retired</span>
					<span>({timelineVtuber[1].retired.length.toLocaleString()})</span>
					<span>—</span>
					<span>{timelineVtuber[0]}</span>
				</div>
				<div class="grid grid-cols-3 gap-2" dir={isMD ? 'rtl' : 'ltr'}>
					{#each timelineVtuber[1].retired as vtuber}
						<VtuberGrid class="col-span-1" id={vtuber.id} name={vtuber.name} image={vtuber.image} height={206} smallText />
					{/each}
				</div>
			</div>

			<div slot="right" class="p-4 flex flex-col gap-2" class:hidden={timelineVtuber[1].debut.length === 0}>
				<div class="flex gap-1 text-lg font-bold text-neutral-400 dark:text-neutral-600 pointer-events-none">
					<span class="text-green-500">Debut</span>
					<span>({timelineVtuber[1].debut.length.toLocaleString()})</span>
					<span>—</span>
					<span>{timelineVtuber[0]}</span>
				</div>
				<div class="grid grid-cols-3 gap-2">
					{#each timelineVtuber[1].debut as vtuber}
						<VtuberGrid class="col-span-1" id={vtuber.id} name={vtuber.name} image={vtuber.image} height={206} smallText />
					{/each}
				</div>
			</div>
		</TimelineItem>
	{/each}
</Timeline>
