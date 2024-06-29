<script lang="ts">
	import VtuberGrid from '$lib/components/layouts/VtuberGrid.svelte';
	import { DayNames, MonthNames } from '$lib/const';
	import { Card, Popover, Span } from 'flowbite-svelte';
	import { twMerge } from 'tailwind-merge';
	import type { VtuberResponseData } from '../../../../api/vtubers/[id]/+server';
	import { getMonthsData, type AgencyEventMonth } from './utils';

	export let vtubers: VtuberResponseData[];

	let eventData: AgencyEventMonth[] = [];
	let showBirthday: boolean = true;
	let showAnniversary: boolean = true;

	$: vtubers, (eventData = getMonthsData(vtubers, showBirthday, showAnniversary));

	const toggleBirthday = () => (showBirthday = !showBirthday);
	const toggleAnniversary = () => (showAnniversary = !showAnniversary);

	const isToday = (year: number, month: number, day: number) => {
		const today = new Date();
		return today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
	};

	const scrollToToday = () =>
		document.getElementById('today')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
</script>

<Card size="none" class="gap-4">
	<div class="flex items-center justify-between gap-4">
		<div>
			<h3>Event Calendar</h3>
			<div>Birthday & Anniversary</div>
		</div>
		<div class="flex flex-wrap items-center justify-end gap-2 font-bold text-white">
			<button
				class="clickable hidden rounded-lg p-2 px-3 text-primary outline outline-1 outline-green-500 xl:block"
				on:click={scrollToToday}
			>
				Today
			</button>
			<button
				class={twMerge(
					'clickable rounded-lg bg-pink-500 p-1 px-2 xl:p-2 xl:px-3',
					!showBirthday && 'bg-neutral-500'
				)}
				on:click={toggleBirthday}
			>
				Birthday
			</button>
			<button
				class={twMerge(
					'clickable rounded-lg bg-indigo-500 p-1 px-2 xl:p-2 xl:px-3',
					!showAnniversary && 'bg-neutral-500'
				)}
				on:click={toggleAnniversary}
			>
				Anniversary
			</button>
		</div>
	</div>
	<div class="grid grid-cols-1 gap-4 text-center md:grid-cols-2 xl:grid-cols-3">
		{#each eventData as data}
			<div>
				<div class="grid grid-cols-7 gap-1 rounded-lg bg-border/30 p-2">
					<h4 class="col-span-7 mb-2 bg-primary-600/10 dark:bg-primary-600/20">
						{MonthNames[data.month]}
						{data.year}
					</h4>
					{#each DayNames as day, i}
						<Span class={twMerge('text-sm', i === 0 || i === 6 ? '!text-red-500' : '')}>
							{day[0]}
						</Span>
					{/each}
					<div class="col-span-7 h-px bg-border" />
					{#each data.days as day}
						<div
							id={isToday(data.year, data.month, day.day) && day.focus ? 'today' : ''}
							class={twMerge(
								'bg-gradient-to-r text-sm text-primary',
								!day.focus && 'opacity-30',
								isToday(data.year, data.month, day.day) &&
									day.focus &&
									'animate-pulse outline outline-1 outline-green-500 md:outline-2',
								day.birthday.length > 0 && day.anniversary.length > 0
									? 'clickable from-pink-500 to-indigo-500 text-white'
									: day.birthday.length > 0
										? 'clickable from-pink-500 to-pink-500 text-white'
										: day.anniversary.length > 0
											? 'clickable from-indigo-500 to-indigo-500 text-white'
											: ''
							)}
						>
							{day.day}
						</div>
						{#if day.birthday.length > 0 || day.anniversary.length > 0}
							<Popover placement="bottom" class="z-50">
								<div class="flex gap-3">
									{#each day.birthday as vtuber}
										<VtuberGrid
											id={vtuber.id}
											name={vtuber.name}
											image={vtuber.image}
											class="size-32 rounded-lg outline outline-2 outline-pink-500 hover:outline-0"
										/>
									{/each}
									{#each day.anniversary as vtuber}
										<VtuberGrid
											id={vtuber.id}
											name={vtuber.name}
											image={vtuber.image}
											class="size-32 rounded-lg outline outline-2 outline-indigo-500 hover:outline-0"
										/>
									{/each}
								</div>
							</Popover>
						{/if}
					{/each}
				</div>
			</div>
		{/each}
	</div>
</Card>
