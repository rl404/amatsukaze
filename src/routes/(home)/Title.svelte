<script lang="ts">
	import { PUBLIC_VTUBER_WIKI_HOST } from '$env/static/public';
	import amatsukaze from '$lib/assets/amatsukaze.png';
	import ChevronLeftIcon from '$lib/components/icons/ChevronLeftIcon.svelte';
	import ChevronRightIcon from '$lib/components/icons/ChevronRightIcon.svelte';
	import GithubIcon from '$lib/components/icons/GithubIcon.svelte';
	import MoonIcon from '$lib/components/icons/MoonIcon.svelte';
	import SunIcon from '$lib/components/icons/SunIcon.svelte';
	import { setTheme, ThemeMode } from '$lib/utils';

	let open: boolean = true;

	const toggleOpen = () => {
		open = !open;
	};

	const links = [
		{ label: 'Vtubers', link: '/vtubers' },
		{ label: 'Agencies', link: '/agencies' }
	];
</script>

<div
	class="absolute bottom-1/4 translate-y-1/4 w-full p-5 bg-gradient-to-r from-white to-pink-500 dark:from-neutral-900 dark:to-indigo-600 drop-shadow-lg transition text-right text-white {!open &&
		'translate-x-full'}"
>
	<div class="absolute block w-full h-full top-0 left-0 opacity-20 bg-no-repeat" style="background-image:url({amatsukaze})" />

	<div class="absolute w-full h-1 block -top-2 left-0 bg-gradient-to-r from-white to-pink-500 dark:from-neutral-900 dark:to-indigo-600 transition" />
	<div
		class="absolute w-full h-1 block -bottom-2 left-0 bg-gradient-to-r from-white to-pink-500 dark:from-neutral-900 dark:to-indigo-600 transition"
	/>

	<div class="text-l sm:text-xl drop-shadow-lg">
		<a href={PUBLIC_VTUBER_WIKI_HOST} target="_blank" rel="noreferrer">Vtuber Wikia</a>
		Visualizer
	</div>

	<div class="text-5xl sm:text-6xl font-bold drop-shadow-lg pointer-events-none">Amatsukaze</div>

	<div class="text-xl drop-shadow-lg text-right grid sm:flex sm:flex-row sm:place-content-end">
		{#each links as link}
			<div class="whitespace-nowrap">
				<a href={link.link}>{link.label}</a><span class="opacity-50 hidden sm:inline-block sm:ml-1 sm:mr-1">|</span>
			</div>
		{/each}
		<div class="whitespace-nowrap flex items-center justify-end gap-2">
			<span class="hover:opacity-70 block dark:hidden cursor-pointer" on:click={() => setTheme(ThemeMode.Dark)} title="light mode">
				<SunIcon class="w-5 h-5" />
			</span>
			<span class="hover:opacity-70 hidden dark:block cursor-pointer" on:click={() => setTheme(ThemeMode.Light)} title="dark mode">
				<MoonIcon class="w-5 h-5" />
			</span>
			<a href="https://github.com/rl404/amatsukaze" target="_blank" rel="noreferrer" title="github source code" class="">
				<GithubIcon class="w-5 h-5" />
			</a>
		</div>
	</div>

	<button
		class="absolute top-1/2 -translate-y-1/2 text-center p-2 bg-pink-500 dark:bg-indigo-600 hover:bg-pink-800 dark:hover:bg-indigo-800 {open
			? 'left-0 rounded-r-full opacity-20 hover:opacity-100'
			: '-left-8 rounded-l-full opacity-100'}"
		title={open ? 'close' : 'open'}
		on:click={toggleOpen}
	>
		{#if open}
			<ChevronRightIcon class="w-4 h-4" />
		{:else}
			<ChevronLeftIcon class="w-4 h-4" />
		{/if}
	</button>
</div>
