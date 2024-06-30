<script lang="ts">
	import { PUBLIC_VTUBER_WIKI_HOST } from '$env/static/public';
	import amatsukaze from '$lib/assets/amatsukaze.png';
	import ChevronLeftIcon from '$lib/components/icons/ChevronLeftIcon.svelte';
	import ChevronRightIcon from '$lib/components/icons/ChevronRightIcon.svelte';
	import GithubIcon from '$lib/components/icons/GithubIcon.svelte';
	import { twMerge } from 'tailwind-merge';
	import ThemeButton from './ThemeButton.svelte';

	const links = [
		{ label: 'Vtubers', link: '/vtubers' },
		{ label: 'Agencies', link: '/agencies' },
		{ label: 'Events', link: '/events' },
		{ label: 'Statistics', link: '/statistics' }
	];

	let open: boolean = true;

	const toggleOpen = () => (open = !open);
</script>

<div
	class={twMerge(
		'bg-gradient absolute bottom-1/4 w-full translate-y-1/4 p-5 text-right text-white transition',
		!open && 'translate-x-full'
	)}
>
	<div
		class="absolute left-0 top-0 h-full w-full bg-no-repeat opacity-20"
		style="background-image:url({amatsukaze})"
	/>
	<div class="bg-gradient absolute -top-2 left-0 h-1 w-full transition" />
	<div class="bg-gradient absolute -bottom-2 left-0 h-1 w-full transition" />

	<h2 class="h4 font-normal text-white drop-shadow-lg">
		<a href={PUBLIC_VTUBER_WIKI_HOST} target="_blank" rel="noreferrer" class="clickable">
			Vtuber Wikia
		</a>
		Visualizer
	</h2>

	<h1 class="pointer-events-none text-5xl font-bold text-white drop-shadow-lg sm:text-6xl">
		Amatsukaze
	</h1>

	<div class="grid items-center text-xl drop-shadow-lg sm:flex sm:justify-end sm:gap-2">
		{#each links as link}
			<h3><a href={link.link} class="clickable">{link.label}</a></h3>
			<span class="hidden sm:inline-block">•</span>
		{/each}
		<div class="mt-2 flex items-center justify-end gap-2 sm:mt-0">
			<ThemeButton />
			<a
				title="github source code"
				href="https://github.com/rl404/amatsukaze"
				target="_blank"
				rel="noreferrer"
				class="clickable"
			>
				<GithubIcon class="size-5" />
			</a>
		</div>
	</div>

	<button
		class={twMerge(
			'absolute top-1/2 -translate-y-1/2 bg-primary-500 p-2',
			open ? 'left-0 rounded-r-full opacity-20 hover:opacity-100' : '-left-8 rounded-l-full'
		)}
		on:click={toggleOpen}
	>
		{#if open}
			<ChevronRightIcon class="size-4" />
		{:else}
			<ChevronLeftIcon class="size-4" />
		{/if}
	</button>
</div>
