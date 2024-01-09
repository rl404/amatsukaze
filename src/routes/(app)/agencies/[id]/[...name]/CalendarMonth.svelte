<script lang="ts">
	import Border from '$lib/components/commons/Border.svelte';
	import { DayNames, MonthNames } from '$lib/utils/const';
	import { formatBirthday } from '$lib/utils/utils';
	import type { SvelteComponent } from 'svelte';
	import type { VtuberResponseData } from '../../../../api/vtubers/[id]/+server';
	import CalendarMonthModal from './CalendarMonthModal.svelte';

	export let month: number;
	export let year: number;
	export let vtubers: VtuberResponseData[];

	type MonthData = {
		date: number;
		title: string;
		class: string;
		birthday: VtuberResponseData[];
		anniversary: VtuberResponseData[];
	};

	const today = new Date();
	const dayOne: number = new Date(year, month, 1).getDay();
	const lastDate: number = new Date(year, month + 1, 0).getDate();
	const lastDay: number = new Date(year, month, lastDate).getDay();
	const lastDateLastMonth: number = new Date(year, month, 0).getDate();

	let modal: SvelteComponent;
	let monthData: MonthData[] = [];

	$: vtubers, setData();

	const setData = () => {
		monthData = [];

		for (let i = dayOne; i > 0; i--) {
			monthData = [
				...monthData,
				{
					date: lastDateLastMonth - i + 1,
					title: '',
					class: 'subtitle',
					birthday: [],
					anniversary: []
				}
			];
		}

		for (let i = 1; i <= lastDate; i++) {
			monthData = [
				...monthData,
				{
					date: i,
					title: formatBirthday(new Date(Date.UTC(year, month, i)).toISOString()),
					class:
						today.toLocaleString().slice(0, 10) ===
						new Date(year, month, i).toLocaleString().slice(0, 10)
							? 'outline outline-1 outline-red-500'
							: '',
					birthday: vtubers.filter((vtuber) => {
						if (!vtuber.birthday || vtuber.retirement_date) return false;
						const date = new Date(vtuber.birthday).toISOString();
						const key = `${today.getFullYear()}-${date.slice(5, 10)}`;
						const curr = new Date(Date.UTC(year, month, i)).toISOString().slice(0, 10);
						return key === curr;
					}),
					anniversary: vtubers.filter((vtuber) => {
						if (!vtuber.debut_date || vtuber.retirement_date) return false;
						const date = new Date(vtuber.debut_date).toISOString();
						const key = `${today.getFullYear()}-${date.slice(5, 10)}`;
						const curr = new Date(Date.UTC(year, month, i)).toISOString().slice(0, 10);
						return key === curr;
					})
				}
			];
		}

		for (let i = lastDay; i < 6; i++) {
			monthData = [
				...monthData,
				{
					date: i - lastDay + 1,
					title: '',
					class: 'subtitle',
					birthday: [],
					anniversary: []
				}
			];
		}
	};

	const onClick = (
		title: string,
		birthdayData: VtuberResponseData[],
		anniversaryData: VtuberResponseData[]
	) =>
		(birthdayData.length > 0 || anniversaryData.length > 0) &&
		modal.toggleOpen(title, birthdayData, anniversaryData);
</script>

<div class="grid grid-cols-7 gap-1 rounded-lg bg-card p-2 text-center text-sm dark:bg-card-dark">
	<div class="col-span-7 text-base font-bold">{MonthNames[month]} {year}</div>
	{#each DayNames as day, i}
		<div class="font-medium {(i === 0 || i === DayNames.length - 1) && 'text-red-500'}" title={day}>
			{day[0]}
		</div>
	{/each}
	<Border class="col-span-7" />
	{#each monthData as data}
		<button
			on:click={() => onClick(data.title, data.birthday, data.anniversary)}
			class="{data.class} bg-gradient-to-r {data.birthday.length > 0 && data.anniversary.length > 0
				? 'clickable from-primary to-primary-dark text-body-dark'
				: data.birthday.length > 0
				  ? 'clickable from-primary to-primary text-body-dark'
				  : data.anniversary.length > 0
				    ? 'clickable from-primary-dark to-primary-dark text-body-dark'
				    : ''}"
		>
			{data.date}
		</button>
	{/each}
</div>

<CalendarMonthModal bind:this={modal} />
