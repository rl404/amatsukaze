<script lang="ts">
	import Accordion from '$lib/components/commons/Accordion.svelte';
	import CalendarIcon from '$lib/components/icons/CalendarIcon.svelte';
	import { MonthNames } from '$lib/utils/const';
	import type { VtuberResponseData } from '../../../../api/vtubers/[id]/+server';
	import CalendarMonth from './CalendarMonth.svelte';

	export let data: VtuberResponseData[];
</script>

<Accordion title="Events" icon={CalendarIcon}>
	<div class="grid grid-cols-1 gap-2 md:grid-cols-2">
		{#if data.length === 0}
			<div class="col-span-1 text-center md:col-span-2">no events found...</div>
		{:else}
			<div class="col-span-1 flex items-center justify-end gap-2 md:col-span-2">
				<div class="pointer-events-none px-2 font-bold outline outline-1 outline-red-500">
					Today
				</div>
				<div class="pointer-events-none bg-primary px-2 font-bold text-white">Birthday</div>
				<div class="pointer-events-none bg-primary-dark px-2 font-bold text-white">Anniversary</div>
			</div>
			{#each MonthNames as _, i}
				<CalendarMonth month={i} year={new Date().getFullYear()} vtubers={data} />
			{/each}
		{/if}
	</div>
</Accordion>
