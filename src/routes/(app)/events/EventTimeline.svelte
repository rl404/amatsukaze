<script lang="ts">
	import VtuberGrid from '$lib/components/layouts/VtuberGrid.svelte';
	import Timeline from '$lib/components/timelines/Timeline.svelte';
	import TimelineItem from '$lib/components/timelines/TimelineItem.svelte';
	import { MonthNames } from '$lib/utils/const';
	import type { VtuberResponseData } from '../../api/vtubers/[id]/+server';

	export let birthdayData: VtuberResponseData[];
	export let anniversaryData: VtuberResponseData[];

	type TimelineCount = {
		id: string;
		birthday: VtuberResponseData[];
		anniversary: VtuberResponseData[];
	};

	type TimelineData = { [date: string]: TimelineCount };

	const today = new Date();

	const birthdayTimeline: TimelineData = birthdayData.reduce(
		(res: TimelineData, vtuber: VtuberResponseData) => {
			if (!vtuber.birthday) return res;
			const date = new Date(vtuber.birthday).toISOString();
			const key = `${today.getFullYear()}-${date.slice(5, 10)}`;
			if (!res[key]) res[key] = { id: key, birthday: [], anniversary: [] };
			res[key].birthday.push(vtuber);
			return res;
		},
		{}
	);

	const anniversaryTimeline: TimelineData = anniversaryData.reduce(
		(res: TimelineData, vtuber: VtuberResponseData) => {
			if (!vtuber.debut_date) return res;
			const date = new Date(vtuber.debut_date).toISOString();
			const key = `${today.getFullYear()}-${date.slice(5, 10)}`;
			if (!res[key]) res[key] = { id: key, birthday: [], anniversary: [] };
			res[key].anniversary.push(vtuber);
			return res;
		},
		{}
	);

	const timelineData: [string, TimelineCount][] = Object.entries(
		Object.entries(anniversaryTimeline).reduce((res, t) => {
			const date = t[0];
			const data = t[1];
			if (!res[date]) res[date] = { id: date, birthday: [], anniversary: [] };
			res[date].anniversary = data.anniversary;
			return res;
		}, birthdayTimeline)
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
			v[0] = `${('0' + d.getDate()).slice(-2)} ${MonthNames[d.getMonth()]}`;
			return v;
		});
</script>

<Timeline>
	{#each timelineData as d}
		<TimelineItem id={d[1].id}>
			<div slot="dot" class="h-3 w-3 rounded-full bg-primary dark:bg-primary-dark" />

			<div slot="left" class="flex flex-col gap-2 p-4" class:hidden={d[1].anniversary.length === 0}>
				<div
					class="subtitle pointer-events-none flex gap-1 text-lg font-bold md:flex-row-reverse md:text-right"
				>
					<span class="text-primary dark:text-primary-dark">Anniversary</span>
					<span>({d[1].anniversary.length.toLocaleString()})</span>
					<span>—</span>
					<span>{d[0]}</span>
				</div>
				<div class="ltr md:rtl grid grid-cols-4 gap-2">
					{#each d[1].anniversary as vtuber}
						<VtuberGrid
							class="ltr col-span-1 text-sm"
							id={vtuber.id}
							name={vtuber.name}
							image={vtuber.image}
							subscriber={vtuber.subscriber}
						/>
					{/each}
				</div>
			</div>

			<div slot="right" class="flex flex-col gap-2 p-4" class:hidden={d[1].birthday.length === 0}>
				<div class="subtitle pointer-events-none flex gap-1 text-lg font-bold">
					<span class="text-primary dark:text-primary-dark">Birthday</span>
					<span>({d[1].birthday.length.toLocaleString()})</span>
					<span>—</span>
					<span>{d[0]}</span>
				</div>
				<div class="grid grid-cols-4 gap-2">
					{#each d[1].birthday as vtuber}
						<VtuberGrid
							class="col-span-1 text-sm"
							id={vtuber.id}
							name={vtuber.name}
							image={vtuber.image}
							subscriber={vtuber.subscriber}
						/>
					{/each}
				</div>
			</div>
		</TimelineItem>
	{/each}
</Timeline>
