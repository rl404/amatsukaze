<script lang="ts">
	import Accordion from '$lib/components/commons/Accordion.svelte';
	import OfficeIcon from '$lib/components/icons/OfficeIcon.svelte';
	import AgencyMates from './AgencyMates.svelte';

	export let id: number;
	export let agencies: string[];
</script>

<Accordion title="Agency-mates" icon={OfficeIcon}>
	{#if agencies.length === 0}
		<div class="text-center">not in agency...</div>
	{:else}
		<div class="grid gap-4">
			{#each agencies as agency}
				<AgencyMates {id} {agency} open={agencies.length === 1} />
			{/each}
		</div>
	{/if}
</Accordion>
