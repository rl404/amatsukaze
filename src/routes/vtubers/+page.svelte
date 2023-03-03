<script lang="ts">
	import type { vtubersResponse } from './+page.server';
	import Head from '$lib/components/Head.svelte';
	import VtuberGrid from '$lib/components/VtuberGrid.svelte';
	import VtuberCard from '$lib/components/VtuberCard.svelte';
	import Border from '$lib/components/Border.svelte';
	import VtuberList from '$lib/components/VtuberList.svelte';

	export let data: vtubersResponse;

	const layouts = [
		{
			name: 'grid',
			svg: 'M3 6a3 3 0 013-3h2.25a3 3 0 013 3v2.25a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm9.75 0a3 3 0 013-3H18a3 3 0 013 3v2.25a3 3 0 01-3 3h-2.25a3 3 0 01-3-3V6zM3 15.75a3 3 0 013-3h2.25a3 3 0 013 3V18a3 3 0 01-3 3H6a3 3 0 01-3-3v-2.25zm9.75 0a3 3 0 013-3H18a3 3 0 013 3V18a3 3 0 01-3 3h-2.25a3 3 0 01-3-3v-2.25z'
		},
		{
			name: 'card',
			svg: 'M4.5 3.75a3 3 0 00-3 3v10.5a3 3 0 003 3h15a3 3 0 003-3V6.75a3 3 0 00-3-3h-15zm4.125 3a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zm-3.873 8.703a4.126 4.126 0 017.746 0 .75.75 0 01-.351.92 7.47 7.47 0 01-3.522.877 7.47 7.47 0 01-3.522-.877.75.75 0 01-.351-.92zM15 8.25a.75.75 0 000 1.5h3.75a.75.75 0 000-1.5H15zM14.25 12a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H15a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3.75a.75.75 0 000-1.5H15z'
		},
		{
			name: 'list',
			svg: 'M2.625 6.75a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875 0A.75.75 0 018.25 6h12a.75.75 0 010 1.5h-12a.75.75 0 01-.75-.75zM2.625 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zM7.5 12a.75.75 0 01.75-.75h12a.75.75 0 010 1.5h-12A.75.75 0 017.5 12zm-4.875 5.25a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875 0a.75.75 0 01.75-.75h12a.75.75 0 010 1.5h-12a.75.75 0 01-.75-.75z'
		}
	];

	let layout: number = 0;

	const nextLayout = () => {
		layout = (layout + 1) % layouts.length;
	};
</script>

<Head title="Vtuber List" description="Visualize vtuber data from wikia to a list." />

<div class="grid grid-cols-6 gap-4">
	<div class="col-span-6">
		<div class="flex flex-wrap items-center justify-between gap-4">
			<div class="text-3xl font-bold">
				Vtuber List <span class="text-xl font-normal opacity-70 hover:opacity-100">- {data.meta.total.toLocaleString()}</span>
			</div>
			<div>
				{#each layouts as l, i}
					{#if i === layout}
						<div title={l.name + ' layout'} on:click={nextLayout} class="hover:opacity-70 cursor-pointer">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7">
								<path fill-rule="evenodd" d={l.svg} clip-rule="evenodd" />
							</svg>
						</div>
					{/if}
				{/each}
			</div>
		</div>
	</div>
	<Border class="col-span-6" />
	{#each data.data as vtuber}
		{#if layout === 0}
			<VtuberGrid class="col-span-3 sm:col-span-2 md:col-span-1" id={vtuber.id} name={vtuber.name} image={vtuber.image} height={206} />
		{/if}
		{#if layout === 1}
			<VtuberCard
				class="col-span-6 sm:col-span-3 lg:col-span-2"
				id={vtuber.id}
				name={vtuber.name}
				image={vtuber.image}
				has2d={vtuber.has_2d}
				has3d={vtuber.has_3d}
				agencies={vtuber.agencies.map((a) => a.name)}
				debutDate={vtuber.debut_date}
				retirementDate={vtuber.retirement_date}
				height={206}
			/>
		{/if}
		{#if layout === 2}
			<VtuberList
				class="col-span-6"
				id={vtuber.id}
				name={vtuber.name}
				image={vtuber.image}
				has2d={vtuber.has_2d}
				has3d={vtuber.has_3d}
				agencies={vtuber.agencies.map((a) => a.name)}
				debutDate={vtuber.debut_date}
				retirementDate={vtuber.retirement_date}
				height={206}
			/>
		{/if}
	{/each}
	<Border class="col-span-6" />
</div>
