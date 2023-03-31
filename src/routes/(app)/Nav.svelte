<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import { setTheme, ThemeMode } from '$lib/utils';
	import logo from '$lib/assets/logo.png';
	import Image from '$lib/components/Image.svelte';
	import GithubIcon from '$lib/components/icons/GithubIcon.svelte';
	import SunIcon from '$lib/components/icons/SunIcon.svelte';
	import MoonIcon from '$lib/components/icons/MoonIcon.svelte';
	import EllipsisVerticalIcon from '$lib/components/icons/EllipsisVerticalIcon.svelte';
	import NavModal from './NavModal.svelte';

	let modal: SvelteComponent;
</script>

<nav class="bg-gradient-to-r from-white to-pink-500 dark:from-neutral-900 dark:to-indigo-600 drop-shadow-lg">
	<div class="container mx-auto max-w-5xl p-4 flex flex-wrap items-center justify-between gap-4">
		<a href="/" class="flex items-center gap-4">
			<Image src={logo} alt="logo" class="h-6 rounded-full" />
			<span class="text-2xl font-bold">Amatsukaze</span>
		</a>
		<div class="hidden sm:flex items-center gap-4 text-white">
			<a href="/vtubers">Vtubers</a>
			<a href="/agencies">Agencies</a>
			<a href="/events">Events</a>
			<a href="/statistics">Statistics</a>
			<div class="border-r border-white h-5 opacity-30" />
			<button class="hover:opacity-70 block dark:hidden" on:click={() => setTheme(ThemeMode.Dark)} title="light mode">
				<SunIcon class="w-6 h-6" />
			</button>
			<button class="hover:opacity-70 hidden dark:block" on:click={() => setTheme(ThemeMode.Light)} title="dark mode">
				<MoonIcon class="w-6 h-6" />
			</button>
			<a href="https://github.com/rl404/amatsukaze" target="_blank" rel="noreferrer" title="github source code">
				<GithubIcon class="w-6 h-6" />
			</a>
		</div>
		<div class="sm:hidden flex items-center text-white">
			<button class="hover:opacity-70" on:click={() => modal.toggleOpen()} title="navigation">
				<EllipsisVerticalIcon class="w-6 h-6" />
			</button>
		</div>
	</div>
</nav>

<NavModal bind:this={modal} />
