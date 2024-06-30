<script lang="ts">
	import Head from '$lib/components/commons/Head.svelte';
	import ChevronDownIcon from '$lib/components/icons/ChevronDownIcon.svelte';
	import { MonthNames } from '$lib/const';
	import { getAxiosError } from '$lib/utils/api';
	import axios from 'axios';
	import {
		Breadcrumb,
		BreadcrumbItem,
		Button,
		Card,
		Dropdown,
		DropdownItem,
		Spinner
	} from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import type { EventResponse } from './+page.server';
	import EventTimeline from './EventTimeline.svelte';

	export let data: EventResponse;

	const today = new Date();
	let open: boolean = false;
	let buttonWidth: number;
	let loading: boolean = false;
	let error: string = '';

	onMount(() => {
		scrollToToday();
	});

	const onChangeMonth = (i: number, jump = false) => {
		if (i === data.month - 1) {
			scrollToToday();
			return;
		}

		data = { ...data, month: i + 1 };

		open = false;
		loading = true;
		error = '';

		axios
			.all([
				axios.get(
					`/api/vtubers?mode=simple&start_birthday_month=${data.month}&end_birthday_month=${data.month}&exclude_retired=true&limit=-1`
				),
				axios.get(
					`/api/vtubers?mode=simple&start_debut_month=${data.month}&end_debut_month=${data.month}&exclude_retired=true&limit=-1`
				)
			])
			.then((res) => {
				data = { ...data, birthday: res[0].data, anniversary: res[1].data };
				jump && scrollToToday();
			})
			.catch((err) => (error = getAxiosError(err)))
			.finally(() => (loading = false));
	};

	const jumpToToday = () => {
		onChangeMonth(today.getMonth(), true);
	};

	const scrollToToday = () => {
		setTimeout(() => {
			const id = `${today.getFullYear()}-${('0' + (today.getMonth() + 1)).slice(-2)}-${('0' + today.getDate()).slice(-2)}`;
			const el = document.getElementById(id);
			el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}, 500);
	};
</script>

<Head
	title="Events"
	description="Mark your calendar and relive the magic of Vtuber history with our comprehensive coverage of current, previous, and upcoming anniversary and birthday events. Stay connected to the excitement, nostalgia, and anticipation within the virtual world."
	image="/events.png"
/>

<div class="grid gap-4">
	<Breadcrumb>
		<BreadcrumbItem home href="/">Home</BreadcrumbItem>
		<BreadcrumbItem>Events</BreadcrumbItem>
	</Breadcrumb>
	<div class="flex items-center justify-between gap-4">
		<h1 class="h1">Birthday & Anniversary Events {new Date().getFullYear()}</h1>
		<Button class="hidden md:block" on:click={jumpToToday}>Jump to Today</Button>
	</div>
	<div class="block sm:hidden" bind:clientWidth={buttonWidth}>
		<Button class="flex w-full items-center gap-2">
			<h4 class="text-white">{MonthNames[data.month - 1]}</h4>
			<ChevronDownIcon class="size-3" />
		</Button>
		<Dropdown bind:open style="width:{buttonWidth}px">
			{#each MonthNames as month, i}
				<DropdownItem on:click={() => onChangeMonth(i)}>{month}</DropdownItem>
			{/each}
		</Dropdown>
	</div>
	<div class="hidden grid-cols-12 gap-2 sm:grid">
		{#each MonthNames as month, i}
			<Button
				color={i === data.month - 1 ? 'primary' : 'alternative'}
				on:click={() => onChangeMonth(i)}
			>
				<span class="block xl:hidden">{month.slice(0, 3)}</span>
				<span class="hidden xl:block">{month}</span>
			</Button>
		{/each}
	</div>
	<Card size="none">
		{#if loading}
			<div class="text-center"><Spinner /></div>
		{:else if error !== ''}
			<div class="text-center text-red-500">{error}</div>
		{:else}
			<EventTimeline
				month={data.month}
				birthdayData={data.birthday.data}
				anniversaryData={data.anniversary.data}
			/>
		{/if}
	</Card>
</div>
