<script lang="ts">
	import Image from '$lib/components/Image.svelte';
	import logo from '$lib/assets/logo.png';
	import { setTheme, ThemeMode } from '$lib/utils';
	import Fa from 'svelte-fa';
	import { faGithub } from '@fortawesome/free-brands-svg-icons';
	import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
</script>

<nav class="p-4 bg-gradient-to-r from-neutral-300 to-pink-500 dark:from-neutral-900 dark:to-indigo-600 drop-shadow-lg">
	<div class="flex flex-wrap items-center justify-between gap-4">
		<a href="/" class="flex items-center gap-4">
			<Image src={logo} alt="logo" class="h-6 rounded-full" />
			<span class="text-2xl font-bold">Amatsukaze</span>
		</a>
		<div class="flex items-center gap-4 text-white text-2xl">
			<span class="hover:opacity-70 block dark:hidden cursor-pointer" on:click={() => setTheme(ThemeMode.Dark)} title="light mode"
				><Fa icon={faSun} pull="right" /></span
			>
			<span class="hover:opacity-70 hidden dark:block cursor-pointer" on:click={() => setTheme(ThemeMode.Light)} title="dark mode"
				><Fa icon={faMoon} pull="right" /></span
			>
			<a href="https://github.com/rl404/amatsukaze" target="_blank" rel="noreferrer" title="github source code"><Fa icon={faGithub} pull="right" /></a
			>
		</div>
	</div>
</nav>

<div class="container mx-auto max-w-5xl px-4 pt-8 pb-16">
	<slot />
</div>
