<script lang="ts">
	import Button from '$lib/components/buttons/Button.svelte';
	import Border from '$lib/components/commons/Border.svelte';
	import Head from '$lib/components/commons/Head.svelte';
	import Loading from '$lib/components/commons/Loading.svelte';
	import { getAxiosError } from '$lib/utils/api';
	import axios from 'axios';
	import { onMount } from 'svelte';
	import type { VtuberResponseData } from '../../api/vtubers/[id]/+server';
	import type { EventResponse } from './+page.server';
	import EventTimeline from './EventTimeline.svelte';
	import MonthDropdown from './MonthDropdown.svelte';

	// TODO: fix jump on mount.

	export let data: EventResponse;

	const monthNow = (new Date().getMonth() + 1).toString();

	let month: string = data.month;
	let birthdayData: VtuberResponseData[] = data.birthday.data;
	let anniversaryData: VtuberResponseData[] = data.anniversary.data;
	let loading: boolean = false;
	let error: string = '';

	onMount(() => onClickJump());

	const onChangeMonth = () => {
		loading = true;
		error = '';

		axios
			.all([
				axios.get(
					`/api/vtubers?start_birthday_month=${month}&end_birthday_month=${month}&exclude_retired=true&limit=-1`
				),
				axios.get(
					`/api/vtubers?start_debut_month=${month}&end_debut_month=${month}&exclude_retired=true&limit=-1`
				)
			])
			.then((res) => {
				birthdayData = res[0].data.data;
				anniversaryData = res[1].data.data;
			})
			.catch((err) => (error = getAxiosError(err)))
			.finally(() => (loading = false));
	};

	const onClickJump = () => {
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

<Head
	title="Events"
	description="Current, previous and upcoming vtuber events."
	image="/events.png"
/>

<div class="grid grid-cols-6 gap-4">
	<div class="col-span-6 flex flex-wrap items-center justify-between gap-4">
		<h1 class="flex basis-full items-center gap-2 text-3xl font-bold sm:basis-auto">
			<span>Events in</span>
			<MonthDropdown bind:value={month} on:change={onChangeMonth} />
		</h1>
		<Button color on:click={onClickJump} class="w-full p-2 px-4 font-bold sm:w-auto">
			Jump to Today
		</Button>
	</div>

	<Border class="col-span-6" />

	{#if loading}
		<div class="col-span-6">
			<Loading class="h-8 w-8" />
		</div>
	{:else if error !== ''}
		<div class="col-span-6 text-center text-red-500">
			{error}
		</div>
	{:else}
		<div class="col-span-6">
			<EventTimeline {birthdayData} {anniversaryData} />
		</div>
	{/if}
</div>
