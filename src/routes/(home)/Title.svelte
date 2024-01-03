<script lang="ts">
	import { PUBLIC_VTUBER_WIKI_HOST } from '$env/static/public';
	import amatsukaze from '$lib/assets/amatsukaze.png';
	import DarkThemeButton from '$lib/components/buttons/DarkThemeButton.svelte';
	import GithubButton from '$lib/components/buttons/GithubButton.svelte';
	import LightThemeButton from '$lib/components/buttons/LightThemeButton.svelte';
	import ChevronLeftIcon from '$lib/components/icons/ChevronLeftIcon.svelte';
	import ChevronRightIcon from '$lib/components/icons/ChevronRightIcon.svelte';

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
	class="bg-gradient absolute bottom-1/4 w-full translate-y-1/4 p-5 text-right text-white drop-shadow-lg transition {!open &&
		'translate-x-full'} "
>
	<div
		class="absolute left-0 top-0 block h-full w-full bg-no-repeat opacity-20"
		style="background-image:url({amatsukaze})"
	/>
	<div class="bg-gradient absolute -top-2 left-0 block h-1 w-full transition" />
	<div class="bg-gradient absolute -bottom-2 left-0 block h-1 w-full transition" />

	<h2 class="text-l drop-shadow-lg sm:text-xl">
		<a href={PUBLIC_VTUBER_WIKI_HOST} target="_blank" rel="noreferrer" class="clickable"
			>Vtuber Wikia</a
		>
		Visualizer
	</h2>

	<h1 class="pointer-events-none text-5xl font-bold drop-shadow-lg sm:text-6xl">Amatsukaze</h1>

	<div class="grid text-right text-xl drop-shadow-lg sm:flex sm:flex-row sm:place-content-end">
		{#each links as link}
			<h3 class="clickable whitespace-nowrap">
				<a href={link.link}>{link.label}</a>
			</h3>
			<span class="hidden opacity-50 sm:ml-1 sm:mr-1 sm:inline-block">|</span>
		{/each}
		<div class="flex items-center justify-end gap-2 whitespace-nowrap">
			<LightThemeButton class="h-5 w-5" />
			<DarkThemeButton class="h-5 w-5" />
			<GithubButton class="h-5 w-5" />
		</div>
	</div>

	<button
		class="absolute top-1/2 -translate-y-1/2 bg-primary p-2 text-center dark:bg-primary-dark {open
			? 'left-0 rounded-r-full opacity-20 hover:opacity-100'
			: '-left-8 rounded-l-full opacity-100'}"
		title={open ? 'close' : 'open'}
		on:click={toggleOpen}
	>
		{#if open}
			<ChevronRightIcon class="h-4 w-4" />
		{:else}
			<ChevronLeftIcon class="h-4 w-4" />
		{/if}
	</button>
</div>
