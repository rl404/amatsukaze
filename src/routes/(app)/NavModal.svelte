<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import GithubIcon from '$lib/components/icons/GithubIcon.svelte';
	import MoonIcon from '$lib/components/icons/MoonIcon.svelte';
	import SunIcon from '$lib/components/icons/SunIcon.svelte';
	import Modal from '$lib/components/modals/Modal.svelte';
	import { setTheme, ThemeMode } from '$lib/utils';

	let modal: SvelteComponent;

	export const toggleOpen = () => {
		modal.toggleOpen();
	};
</script>

<Modal bind:this={modal}>
	<span slot="title">Navigation</span>

	<div slot="body" class="p-4 grid gap-4">
		<div>
			<a href="/vtubers" data-sveltekit-reload>Vtuber list</a>
		</div>
		<div>
			<a href="/agencies" data-sveltekit-reload>Agency list</a>
		</div>
		<div>
			<a href="/statistics" data-sveltekit-reload>Statistics</a>
		</div>
		<div>
			<a href="/events" data-sveltekit-reload>Events</a>
		</div>
	</div>

	<div slot="footer" class="p-4 border-t dark:border-neutral-600 flex justify-end gap-4">
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
</Modal>
