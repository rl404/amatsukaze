<script lang="ts">
	import Accordion from '$lib/components/Accordion.svelte';
	import AgencyMates from './AgencyMates.svelte';

	export let id: number;
	export let agencies: Array<string>;
</script>

<Accordion title="Agency-mates">
	<div class="grid gap-2">
		{#if agencies.length === 0}
			<div class="text-center">not in agency...</div>
		{:else}
			{#each agencies as agency}
				<AgencyMates {id} {agency} open={agencies.length === 1} />
			{/each}
		{/if}
	</div>
</Accordion>
