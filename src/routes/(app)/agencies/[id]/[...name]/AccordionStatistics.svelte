<script lang="ts">
	import Accordion from '$lib/components/Accordion.svelte';
	import ChartIcon from '$lib/components/icons/ChartIcon.svelte';
	import type { vtuberResponseData } from '../../../../api/vtubers/[id]/+server';
	import MembersChart from './MembersChart.svelte';

	export let data: Array<vtuberResponseData>;
</script>

<Accordion title="Statistics" icon={ChartIcon} open>
	<div class="grid gap-2">
		{#if data.length === 0}
			<div class="text-center">no vtubers found...</div>
		{:else}
			<MembersChart vtubers={data} />
		{/if}
	</div>
</Accordion>
