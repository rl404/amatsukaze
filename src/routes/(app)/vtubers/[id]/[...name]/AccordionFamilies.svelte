<script lang="ts">
	import Accordion from '$lib/components/Accordion.svelte';
	import UserGroupIcon from '$lib/components/icons/UserGroupIcon.svelte';
	import Families from './Families.svelte';

	export let id: number;
	export let designers: Array<string>;
</script>

<Accordion title="Families" icon={UserGroupIcon}>
	{#if designers.length === 0}
		<div class="text-center">no family...</div>
	{:else}
		{#each designers as designer}
			<Families {id} {designer} open={designers.length === 1} />
		{/each}
	{/if}
</Accordion>
