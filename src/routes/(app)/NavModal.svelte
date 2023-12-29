<script lang="ts">
	import DarkThemeButton from '$lib/components/buttons/DarkThemeButton.svelte';
	import GithubButton from '$lib/components/buttons/GithubButton.svelte';
	import LightThemeButton from '$lib/components/buttons/LightThemeButton.svelte';
	import CalendarIcon from '$lib/components/icons/CalendarIcon.svelte';
	import ChartIcon from '$lib/components/icons/ChartIcon.svelte';
	import ListIcon from '$lib/components/icons/ListIcon.svelte';
	import SignInIcon from '$lib/components/icons/SignInIcon.svelte';
	import SignOutIcon from '$lib/components/icons/SignOutIcon.svelte';
	import UserIcon from '$lib/components/icons/UserIcon.svelte';
	import Modal from '$lib/components/modals/Modal.svelte';
	import { isLogin } from '$lib/utils/auth';
	import type { SvelteComponent } from 'svelte';

	let modal: SvelteComponent;
	let login: boolean = false;

	isLogin.subscribe((v) => (login = v));

	export const toggleOpen = () => modal.toggleOpen();
</script>

<Modal bind:this={modal} class="max-w-md">
	<div slot="header" class="text-xl font-bold">Navigation</div>

	<div slot="body" class="grid gap-4 p-4">
		<a href="/vtubers" class="clickable flex items-center gap-2" data-sveltekit-reload>
			<ListIcon class="h-4 w-4" />
			<span>Vtuber list</span>
		</a>
		<a href="/agencies" class="clickable flex items-center gap-2" data-sveltekit-reload>
			<ListIcon class="h-4 w-4" />
			<span>Agency list</span>
		</a>
		<a href="/events" class="clickable flex items-center gap-2" data-sveltekit-reload>
			<CalendarIcon class="h-4 w-4" />
			<span>Events</span>
		</a>
		<a href="/statistics" class="clickable flex items-center gap-2" data-sveltekit-reload>
			<ChartIcon class="h-4 w-4" /><span>Statistics</span>
		</a>
	</div>

	<div slot="footer" class="flex items-center justify-end gap-4 p-4">
		<LightThemeButton class="h-6 w-6" />
		<DarkThemeButton class="h-6 w-6" />
		<GithubButton class="h-6 w-6" />
		{#if login}
			<a href="/profile" class="clickable" title="profile">
				<UserIcon class="h-6 w-6" />
			</a>
			<a href="/auth/sign-out" class="clickable" title="sign-out">
				<SignOutIcon class="h-6 w-6" />
			</a>
		{:else}
			<a href="/auth/sign-in" class="clickable" title="sign-in">
				<SignInIcon class="h-6 w-6" />
			</a>
		{/if}
	</div>
</Modal>
