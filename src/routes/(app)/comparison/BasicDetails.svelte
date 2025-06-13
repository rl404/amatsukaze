<script lang="ts">
	import { isEmptyArray, toURL } from '$lib/utils/utils';
	import { Badge, Card, P, Tooltip } from 'flowbite-svelte';
	import { twMerge } from 'tailwind-merge';
	import type { VtuberResponseData } from '../../api/vtubers/[id]/+server';

	export let data: VtuberResponseData[] | any[] = [{}, {}, {}];
</script>

<Card class="grid max-w-full grid-cols-3 gap-4 p-4 sm:p-6">
	<h3 class="h3 col-span-3 text-center">
		<span class="border-primary-500 border-l-4 pl-2">Basic Details</span>
	</h3>
	{#each data as vtuber, i}
		<div class={twMerge('flex flex-col', i == 1 && 'border-border border-x')}>
			<h4 class="text-center font-bold">Original Names</h4>
			{#if isEmptyArray(vtuber.original_names)}
				<P class="text-center">-</P>
			{:else}
				{#each vtuber.original_names as name}
					<P class="text-center">{name}</P>
				{/each}
			{/if}
		</div>
	{/each}
	{#each data as vtuber, i}
		<div class={twMerge('flex flex-col', i == 1 && 'border-border border-x')}>
			<h4 class="text-center font-bold">Nicknames</h4>
			{#if isEmptyArray(vtuber.nicknames)}
				<P class="text-center">-</P>
			{:else}
				{#each vtuber.nicknames as name}
					<P class="text-center">{name}</P>
				{/each}
			{/if}
		</div>
	{/each}
	{#each data as vtuber, i}
		<div class={twMerge('flex flex-col', i == 1 && 'border-border border-x')}>
			<h4 class="text-center font-bold">Status</h4>
			<div class="text-center">
				{#if !vtuber.id}
					<P class="text-center">-</P>
				{:else if vtuber.retirement_date}
					<Badge large color="red">Retired</Badge>
				{:else}
					<Badge large color="green">Active</Badge>
				{/if}
			</div>
		</div>
	{/each}
	{#each data as vtuber, i}
		<div
			class={twMerge('grid grid-cols-1 gap-4 md:grid-cols-2', i == 1 && 'border-border border-x')}
		>
			<div class="flex flex-col">
				<h4 class="text-center font-bold">Debut Date</h4>
				<P class="text-center">{!vtuber.debut_date ? '-' : vtuber.debut_date.slice(0, 10)}</P>
			</div>
			<div class="flex flex-col">
				<h4 class="text-center font-bold">Retirement Date</h4>
				<P class="text-center">
					{!vtuber.retirement_date ? '-' : vtuber.retirement_date.slice(0, 10)}
				</P>
			</div>
		</div>
	{/each}
	{#each data as vtuber, i}
		<div class={twMerge('flex flex-col', i == 1 && 'border-border border-x')}>
			<h4 class="text-center font-bold">Model</h4>
			<div class="flex flex-wrap items-center justify-center gap-2">
				{#if vtuber.has_2d}
					<Badge large color="pink">2D Model</Badge>
					<Tooltip>has 2D model</Tooltip>
				{/if}
				{#if vtuber.has_3d}
					<Badge large color="indigo">3D Model</Badge>
					<Tooltip>has 3D model</Tooltip>
				{/if}
			</div>
		</div>
	{/each}
	{#each data as vtuber, i}
		<div class={twMerge('flex flex-col', i == 1 && 'border-border border-x')}>
			<h4 class="text-center font-bold">Character Designers</h4>
			{#if isEmptyArray(vtuber.character_designers)}
				<P class="text-center">-</P>
			{:else}
				{#each vtuber.character_designers as name}
					<P class="text-center">
						<a href={`/vtubers?character_designer=${name}`} class="clickable underline">
							{name}
						</a>
					</P>
				{/each}
			{/if}
		</div>
	{/each}
	{#each data as vtuber, i}
		<div
			class={twMerge('grid grid-cols-1 gap-4 md:grid-cols-2', i == 1 && 'border-border border-x')}
		>
			<div class="flex flex-col">
				<h4 class="text-center font-bold">2D Modeler</h4>
				{#if isEmptyArray(vtuber.character_2d_modelers)}
					<P class="text-center">-</P>
				{:else}
					{#each vtuber.character_2d_modelers as name}
						<P class="text-center">
							<a href={`/vtubers?character_2d_modeler=${name}`} class="clickable underline">
								{name}
							</a>
						</P>
					{/each}
				{/if}
			</div>
			<div class="flex flex-col">
				<h4 class="text-center font-bold">3D Modeler</h4>
				{#if isEmptyArray(vtuber.character_3d_modelers)}
					<P class="text-center">-</P>
				{:else}
					{#each vtuber.character_3d_modelers as name}
						<P class="text-center">
							<a href={`/vtubers?character_3d_modeler=${name}`} class="clickable underline">
								{name}
							</a>
						</P>
					{/each}
				{/if}
			</div>
		</div>
	{/each}
	{#each data as vtuber, i}
		<div
			class={twMerge('grid grid-cols-1 gap-4 md:grid-cols-2', i == 1 && 'border-border border-x')}
		>
			<div class="flex flex-col">
				<h4 class="text-center font-bold">Agencies</h4>
				{#if isEmptyArray(vtuber.agencies)}
					<P class="text-center">-</P>
				{:else}
					{#each vtuber.agencies as agency}
						<P class="text-center">
							<a href={`/agencies/${agency.id}/${toURL(agency.name)}`} class="clickable underline">
								{agency.name}
							</a>
						</P>
					{/each}
				{/if}
			</div>
			<div class="flex flex-col">
				<h4 class="text-center font-bold">Affiliations</h4>
				{#if isEmptyArray(vtuber.affiliations)}
					<P class="text-center">-</P>
				{:else}
					{#each vtuber.affiliations as name}
						<P class="text-center">{name}</P>
					{/each}
				{/if}
			</div>
		</div>
	{/each}
	{#each data as vtuber, i}
		<div class={twMerge('flex flex-col', i == 1 && 'border-border border-x')}>
			<h4 class="text-center font-bold">Languages</h4>
			{#if isEmptyArray(vtuber.languages)}
				<P class="text-center">-</P>
			{:else}
				{#each vtuber.languages as language}
					<P class="text-center">{language.name}</P>
				{/each}
			{/if}
		</div>
	{/each}
</Card>
