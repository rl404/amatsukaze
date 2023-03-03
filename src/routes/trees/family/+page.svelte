<script lang="ts">
	import Head from '$lib/components/Head.svelte';
	import type { vtuberFamilyTreeResponse } from './+page.server';

	export let data: vtuberFamilyTreeResponse;
</script>

<Head title="Family Tree" description="Visualize vtuber data from wikia to family tree." />
