<script lang="ts">
	import Accordion from '$lib/components/Accordion.svelte';
	import type { vtuberResponseData } from '../../../api/vtubers/[id]/+server';

	export let agency: string;

	let vtubers: Array<vtuberResponseData> = [];
</script>

<Accordion title="Statistics">
	<div class="grid gap-2">
		{#if vtubers.length === 0}
			<div class="text-center">no vtubers found...</div>
		{:else}
			<div>{agency}</div>
		{/if}
	</div>
</Accordion>
