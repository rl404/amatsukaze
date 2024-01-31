<script lang="ts">
	import Accordion from '$lib/components/commons/Accordion.svelte';
	import CalendarIcon from '$lib/components/icons/CalendarIcon.svelte';
	import { MonthNames } from '$lib/utils/const';
	import type { VtuberResponseData } from '../../../../api/vtubers/[id]/+server';
	import CalendarMonth from './CalendarMonth.svelte';

	export let data: VtuberResponseData[];

	let showBirthday: boolean = true;
	let showAnniversary: boolean = true;

	const toggleBirthday = () => (showBirthday = !showBirthday);
	const toggleAnniversary = () => (showAnniversary = !showAnniversary);
</script>

<Accordion title="Events" icon={CalendarIcon}>
	<div class="grid grid-cols-1 gap-2 md:grid-cols-2">
		{#if data.length === 0}
			<div class="col-span-1 text-center md:col-span-2">no events found...</div>
		{:else}
			<div class="col-span-1 flex items-center justify-end gap-2 md:col-span-2">
				<div class="pointer-events-none px-2 font-bold outline outline-1 outline-green-500">
					Today
				</div>
				<button
					class="clickable px-2 font-bold text-white {showBirthday
						? 'bg-primary'
						: 'bg-border dark:bg-border-dark'}"
					on:click={toggleBirthday}
				>
					Birthday
				</button>
				<button
					class="clickable px-2 font-bold text-white {showAnniversary
						? 'bg-primary-dark'
						: 'bg-border dark:bg-border-dark'}"
					on:click={toggleAnniversary}
				>
					Anniversary
				</button>
			</div>
			{#each MonthNames as _, i}
				<CalendarMonth
					month={i}
					year={new Date().getFullYear()}
					vtubers={data}
					{showBirthday}
					{showAnniversary}
				/>
			{/each}
		{/if}
	</div>
</Accordion>
