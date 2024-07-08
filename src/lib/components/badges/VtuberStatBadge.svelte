<script lang="ts">
	import type { VtuberSort } from '$lib/types';
	import { compactInt } from '$lib/utils/utils';

	export let subscriber: number;
	export let debutDate: Date | undefined;
	export let retirementDate: Date | undefined;
	export let monthlySubs: number;
	export let videoCount: number;
	export let sort: VtuberSort = 'name';

	let value: string = '';

	$: value = getValue(sort);

	const getValue = (sort: VtuberSort): string => {
		switch (sort) {
			case 'subscriber':
			case '-subscriber':
				if (subscriber > 0) return compactInt(subscriber);
				return '';
			case 'debut_date':
			case '-debut_date':
				if (debutDate) return debutDate.toISOString().slice(0, 10);
				return '';
			case 'retirement_date':
			case '-retirement_date':
				if (retirementDate) return retirementDate.toISOString().slice(0, 10);
				return '';
			case 'monthly_subscriber':
			case '-monthly_subscriber':
				if (monthlySubs > 0) return compactInt(monthlySubs);
				return '';
			case 'video_count':
			case '-video_count':
				if (videoCount > 0) return videoCount.toLocaleString();
				return '';
			default:
				return '';
		}
	};
</script>

{#if value !== ''}
	<div class="rounded bg-primary-500 px-2 text-xs font-bold text-white">
		{value}
	</div>
{/if}
