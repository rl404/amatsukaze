<script lang="ts">
	import Border from '$lib/components/Border.svelte';
	import Button from '$lib/components/buttons/Button.svelte';
	import Head from '$lib/components/Head.svelte';
	import axios from 'axios';
	import type { vtuberResponseData } from '../../api/vtubers/[id]/+server';
	import type { eventResponse } from './+page.server';
	import EventTimeline from './EventTimeline.svelte';
	import MonthDropdown from './MonthDropdown.svelte';
	import { getAxiosError } from '$lib/utils';
	import SpinnerIcon from '$lib/components/icons/SpinnerIcon.svelte';

	export let data: eventResponse;

	let month: string = data.month;
	let birthdayData: Array<vtuberResponseData> = data.birthday.data;
	let anniversaryData: Array<vtuberResponseData> = data.anniversary.data;
	let loading: boolean = false;
	let error: string = '';

	const onChangeMonth = () => {
		loading = true;
		error = '';

		axios
			.all([
				axios.get(`/api/vtubers?start_birthday_month=${month}&end_birthday_month=${month}&exclude_retired=true&limit=-1`),
				axios.get(`/api/vtubers?start_debut_month=${month}&end_debut_month=${month}&exclude_retired=true&limit=-1`)
			])
			.then((res) => {
				birthdayData = res[0].data.data;
				anniversaryData = res[1].data.data;
			})
			.catch((err) => {
				error = getAxiosError(err);
			})
			.finally(() => {
				loading = false;
			});
	};

	const onClickJump = () => {
		const monthNow = (new Date().getMonth() + 1).toString();
		if (month === monthNow) {
			const id = `${new Date().toISOString().slice(0, 10)}`;
			const el = document.getElementById(id);
			el?.scrollIntoView({ behavior: 'smooth' });
		} else {
			month = monthNow;
			onChangeMonth();
		}
	};
</script>

<Head title="Events" description="Current, previous and upcoming vtuber events." image="/events.png" />

<div class="grid grid-cols-6 gap-4">
	<div class="col-span-6">
		<div class="flex flex-wrap items-center justify-between gap-4">
			<div class="text-3xl font-bold flex gap-2">Events in <MonthDropdown bind:value={month} on:change={onChangeMonth} /></div>
			<div>
				<Button color on:click={onClickJump}>Jump to Today</Button>
			</div>
		</div>
	</div>
	<Border class="col-span-6" />
	{#if loading}
		<div class="col-span-6">
			<SpinnerIcon class="w-8 h-8 m-auto text-gray-200 animate-spin dark:text-gray-600 fill-pink-500 dark:fill-indigo-600" />
		</div>
	{:else if error !== ''}
		<div class="col-span-6 text-red-500 text-center">
			{error}
		</div>
	{:else}
		<div class="col-span-6">
			<EventTimeline {birthdayData} {anniversaryData} />
		</div>
	{/if}
	<Border class="col-span-6" />
</div>
