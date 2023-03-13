<script lang="ts">
	import Accordion from '$lib/components/Accordion.svelte';
	import AgencyMates from './AgencyMates.svelte';

	export let id: number;
	export let agencies: Array<string>;
</script>

<Accordion title="Agency-mates">
	<div class="grid gap-2">
		{#each agencies as agency}
			<AgencyMates {id} {agency} open={agencies.length === 1} />
		{/each}
	</div>
</Accordion>
