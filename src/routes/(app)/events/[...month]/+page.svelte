<script lang="ts">
	import { page } from '$app/stores';
	import Border from '$lib/components/Border.svelte';
	import Button from '$lib/components/buttons/Button.svelte';
	import Head from '$lib/components/Head.svelte';
	import { parseMonth } from '$lib/utils';
	import type { eventResponse } from './+page.server';
	import EventTimeline from './EventTimeline.svelte';
	import MonthDropdown from './MonthDropdown.svelte';

	export let data: eventResponse;

	const birthdayData = data.birthday.data;
	const anniversaryData = data.anniversary.data;

	let month: string = parseMonth($page.params.month);

	const onChangeMonth = () => {
		window.location.href = `/events/${month}`;
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
	<div class="col-span-6">
		<EventTimeline {birthdayData} {anniversaryData} />
	</div>
	<Border class="col-span-6" />
</div>
