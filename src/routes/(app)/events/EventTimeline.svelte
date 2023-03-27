<script lang="ts">
	import VtuberGrid from '$lib/components/layouts/VtuberGrid.svelte';
	import Timeline from '$lib/components/timelines/Timeline.svelte';
	import TimelineItem from '$lib/components/timelines/TimelineItem.svelte';
	import { isScreen, monthNames } from '$lib/utils';
	import { onMount } from 'svelte';
	import type { vtuberResponseData } from '../../api/vtubers/[id]/+server';

	export let birthdayData: Array<vtuberResponseData>;
	export let anniversaryData: Array<vtuberResponseData>;

	type timelineCount = { id: string; birthday: Array<vtuberResponseData>; anniversary: Array<vtuberResponseData> };
	type timelineData = { [data: string]: timelineCount };

	const today = new Date();

	const birthdayTimeline: timelineData = birthdayData.reduce((res: timelineData, vtuber: vtuberResponseData) => {
		if (!vtuber.birthday) return res;
		const date = new Date(vtuber.birthday).toISOString();
		const key = `${today.getFullYear()}-${date.slice(5, 10)}`;
		if (!res[key]) res[key] = { id: key, birthday: [], anniversary: [] };
		res[key].birthday.push(vtuber);
		return res;
	}, {});

	const anniversaryTimeline: timelineData = anniversaryData.reduce((res: timelineData, vtuber: vtuberResponseData) => {
		if (!vtuber.debut_date) return res;
		const date = new Date(vtuber.debut_date).toISOString();
		const key = `${today.getFullYear()}-${date.slice(5, 10)}`;
		if (!res[key]) res[key] = { id: key, birthday: [], anniversary: [] };
		res[key].anniversary.push(vtuber);
		return res;
	}, {});

	let timelineVtubers: Array<[string, timelineCount]> = Object.entries(
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
			v[0] = `${('0' + d.getDate()).slice(-2)} ${monthNames[d.getMonth()]}`;
			return v;
		});

	let isMD: boolean = true;

	const updateIsMD = () => {
		isMD = isScreen('md');
	};

	onMount(() => {
		updateIsMD();

		const id = `${today.toISOString().slice(0, 10)}`;
		const el = document.getElementById(id);
		el?.scrollIntoView({ behavior: 'smooth' });
	});
</script>

<svelte:window on:resize={updateIsMD} />

<Timeline>
	{#each timelineVtubers as timelineVtuber}
		<TimelineItem
			id={timelineVtuber[1].id}
			dotClass="top-6 bg-pink-500 dark:bg-indigo-600"
			leftClass="order-2 md:order-1"
			rightClass="order-1 md:order-2"
		>
			<div slot="left" class="p-4 flex flex-col gap-2" class:hidden={timelineVtuber[1].anniversary.length === 0}>
				<div class="flex gap-1 md:flex-row-reverse md:text-right text-lg font-bold text-neutral-400 dark:text-neutral-600 pointer-events-none">
					<span class="text-pink-500 dark:text-indigo-600">Anniversary</span>
					<span>({timelineVtuber[1].anniversary.length.toLocaleString()})</span>
					<span>—</span>
					<span>{timelineVtuber[0]}</span>
				</div>
				<div class="grid grid-cols-3 gap-2" dir={isMD ? 'rtl' : 'ltr'}>
					{#each timelineVtuber[1].anniversary as vtuber}
						<VtuberGrid class="col-span-1" id={vtuber.id} name={vtuber.name} image={vtuber.image} height={206} smallText />
					{/each}
				</div>
			</div>

			<div slot="right" class="p-4 flex flex-col gap-2" class:hidden={timelineVtuber[1].birthday.length === 0}>
				<div class="flex gap-1 text-lg font-bold text-neutral-400 dark:text-neutral-600 pointer-events-none">
					<span class="text-pink-500 dark:text-indigo-600">Birthday</span>
					<span>({timelineVtuber[1].birthday.length.toLocaleString()})</span>
					<span>—</span>
					<span>{timelineVtuber[0]}</span>
				</div>
				<div class="grid grid-cols-3 gap-2">
					{#each timelineVtuber[1].birthday as vtuber}
						<VtuberGrid class="col-span-1" id={vtuber.id} name={vtuber.name} image={vtuber.image} height={206} smallText />
					{/each}
				</div>
			</div>
		</TimelineItem>
	{/each}
</Timeline>
