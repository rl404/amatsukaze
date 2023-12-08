<script lang="ts">
	import { getAxiosError } from '$lib/utils';
	import { amatsukazeAxios } from '$lib/utils/axios';
	import { onMount } from 'svelte';
	import type { tierListsResponseData } from '../../api/tier-lists/+server';
	import SpinnerIcon from '$lib/components/icons/SpinnerIcon.svelte';
	import VtuberGrid from '../tier-list/[...id]/VtuberGrid.svelte';

	export let userID: number = 0;

	let tierLists: tierListsResponseData[] = [];
	let loading: boolean = true;
	let error: string = '';

	onMount(() => {
		amatsukazeAxios
			.get(`/api/tier-lists?user_id=${userID}&limit=5`)
			.then((resp) => (tierLists = resp.data.data))
			.catch((err) => (error = getAxiosError(err)))
			.finally(() => (loading = false));
	});
</script>

{#if loading}
	<div><SpinnerIcon class="w-8 h-8 m-auto text-gray-200 animate-spin dark:text-gray-600 fill-pink-500 dark:fill-indigo-600" /></div>
{:else if error !== ''}
	<div class="text-center text-red-500">{error}</div>
{:else}
	<div class="grid gap-4">
		{#each tierLists as tierList}
			<div class="flex items-center justify-between gap-4">
				<div class="grow grid gap-1">
					<div class="flex items-center justify-between gap-2">
						<a href="/tier-list/{tierList.id}/{tierList.title}" class="text-xl font-bold line-clamp-1">{tierList.title} Tier List</a>
						<div class="text-sm opacity-70" title={tierList.updated_at}>{new Date(tierList.updated_at).toISOString().slice(0, 10)}</div>
					</div>
					<div class="line-clamp-3 whitespace-pre">{tierList.description}</div>
				</div>
				<div class="flex items-center gap-1">
					{#each [...tierList.tiers.map((d) => d.vtubers).flat(), ...tierList.options].slice(0, 5) as vtuber, i}
						<VtuberGrid id={vtuber.id} name={vtuber.name} image={vtuber.image} class="w-24 {i > 0 && 'hidden md:block'}" />
					{/each}
				</div>
			</div>
		{/each}
	</div>
{/if}
