<script lang="ts">
	import type { AgencySort } from '$lib/types';
	import { compactInt } from '$lib/utils/utils';

	export let member: number;
	export let subscriber: number;
	export let sort: AgencySort = 'name';

	let value: string = '';

	$: value = getValue(sort);

	const getValue = (sort: AgencySort): string => {
		switch (sort) {
			case 'member':
			case '-member':
				if (member > 0) return member.toLocaleString();
				return '';
			case 'subscriber':
			case '-subscriber':
				if (subscriber > 0) return compactInt(subscriber);
				return '';
			default:
				return '';
		}
	};
</script>

{#if value !== ''}
	<div class="bg-primary-500 rounded px-2 text-xs font-bold text-white">
		{value}
	</div>
{/if}
