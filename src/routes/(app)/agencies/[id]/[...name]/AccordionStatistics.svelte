<script lang="ts">
	import Accordion from '$lib/components/commons/Accordion.svelte';
	import ChartIcon from '$lib/components/icons/ChartIcon.svelte';
	import type { VtuberResponseData } from '../../../../api/vtubers/[id]/+server';
	import MembersChart from './MembersChart.svelte';

	export let data: VtuberResponseData[];
</script>

<Accordion title="Statistics" icon={ChartIcon} open>
	{#if data.length === 0}
		<div class="text-center">no vtubers found...</div>
	{:else}
		<MembersChart {data} />
	{/if}
</Accordion>
