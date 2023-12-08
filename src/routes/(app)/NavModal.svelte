<script lang="ts">
	import { onMount, type SvelteComponent } from 'svelte';
	import GithubIcon from '$lib/components/icons/GithubIcon.svelte';
	import MoonIcon from '$lib/components/icons/MoonIcon.svelte';
	import SunIcon from '$lib/components/icons/SunIcon.svelte';
	import Modal from '$lib/components/modals/Modal.svelte';
	import { setTheme, ThemeMode } from '$lib/utils';
	import ChartIcon from '$lib/components/icons/ChartIcon.svelte';
	import CalendarIcon from '$lib/components/icons/CalendarIcon.svelte';
	import ListIcon from '$lib/components/icons/ListIcon.svelte';
	import { getAccessToken } from '$lib/utils/oauth';
	import UserIcon from '$lib/components/icons/UserIcon.svelte';
	import SignInIcon from '$lib/components/icons/SignInIcon.svelte';

	let modal: SvelteComponent;
	let isLogin: boolean = false;

	onMount(() => {
		if (getAccessToken()) isLogin = true;
	});

	export const toggleOpen = () => {
		modal.toggleOpen();
	};
</script>

<Modal bind:this={modal}>
	<span slot="title">Navigation</span>

	<div slot="body" class="p-4 grid gap-4">
		<div>
			<a href="/vtubers" data-sveltekit-reload class="flex gap-2 items-center"><ListIcon class="w-4 h-4" />Vtuber list</a>
		</div>
		<div>
			<a href="/agencies" data-sveltekit-reload class="flex gap-2 items-center"><ListIcon class="w-4 h-4" />Agency list</a>
		</div>
		<div>
			<a href="/events" data-sveltekit-reload class="flex gap-2 items-center"><CalendarIcon class="w-4 h-4" />Events</a>
		</div>
		<div>
			<a href="/statistics" data-sveltekit-reload class="flex gap-2 items-center"><ChartIcon class="w-4 h-4" /> Statistics</a>
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
		{#if isLogin}
			<a href="/profile" title="profile">
				<UserIcon class="w-6 h-6" />
			</a>
		{:else}
			<a href="/auth/sign-in" title="sign-in">
				<SignInIcon class="w-6 h-6" />
			</a>
		{/if}
	</div>
</Modal>
