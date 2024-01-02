<script lang="ts">
	import Loading from '$lib/components/commons/Loading.svelte';
	import TierListGrid from '$lib/components/layouts/TierListGrid.svelte';
	import { getAxiosError } from '$lib/utils/api';
	import { amatsukazeAxios } from '$lib/utils/axios';
	import { onMount } from 'svelte';
	import type { TierListResponseData } from '../tier-lists/[id]/[...title]/+page.server';

	export let userID: number = 0;

	let tierLists: TierListResponseData[] = [];
	let loading: boolean = true;
	let error: string = '';

	onMount(() => {
		amatsukazeAxios
			.get(`/api/tier-lists?user_id=${userID}&limit=8`)
			.then((resp) => (tierLists = resp.data.data))
			.catch((err) => (error = getAxiosError(err)))
			.finally(() => (loading = false));
	});
</script>

{#if loading}
	<div><Loading class="h-8 w-8" /></div>
{:else if error !== ''}
	<div class="text-center text-red-500">{error}</div>
{:else}
	<div class="grid grid-cols-12 gap-2">
		{#each tierLists as tierList}
			<TierListGrid data={tierList} class="col-span-6 sm:col-span-4 lg:col-span-3" />
		{/each}
		<div class="col-span-12 text-center">
			<a href="/tier-lists?user_id={userID}" class="clickable">View More</a>
		</div>
	</div>
{/if}
