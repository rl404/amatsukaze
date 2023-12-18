<script lang="ts">
	import logo from '$lib/assets/logo.png';
	import DarkThemeButton from '$lib/components/buttons/DarkThemeButton.svelte';
	import GithubButton from '$lib/components/buttons/GithubButton.svelte';
	import LightThemeButton from '$lib/components/buttons/LightThemeButton.svelte';
	import Image from '$lib/components/commons/Image.svelte';
	import EllipsisVerticalIcon from '$lib/components/icons/EllipsisVerticalIcon.svelte';
	import SignInIcon from '$lib/components/icons/SignInIcon.svelte';
	import SignOutIcon from '$lib/components/icons/SignOutIcon.svelte';
	import UserIcon from '$lib/components/icons/UserIcon.svelte';
	import { getAccessToken } from '$lib/utils/auth';
	import { onMount, type SvelteComponent } from 'svelte';
	import NavModal from './NavModal.svelte';

	let modal: SvelteComponent;
	let isLogin: boolean = false;

	onMount(() => {
		if (getAccessToken()) isLogin = true;
	});
</script>

<nav class="bg-gradient text-white drop-shadow-lg">
	<div class="container mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 p-4">
		<a href="/" class="clickable flex items-center gap-4">
			<Image src={logo} alt="logo" class="h-6 rounded-full" />
			<span class="text-2xl font-bold">Amatsukaze</span>
		</a>
		<div class="hidden items-center gap-4 sm:flex">
			<a href="/vtubers" class="clickable" data-sveltekit-reload>Vtubers</a>
			<a href="/agencies" class="clickable" data-sveltekit-reload>Agencies</a>
			<a href="/events" class="clickable" data-sveltekit-reload>Events</a>
			<a href="/statistics" class="clickable" data-sveltekit-reload>Statistics</a>
			<div class="h-5 border-r border-white opacity-30" />
			<LightThemeButton class="h-6 w-6" />
			<DarkThemeButton class="h-6 w-6" />
			<GithubButton class="h-6 w-6" />
			{#if isLogin}
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
		<div class="flex items-center sm:hidden">
			<button class="clickable" title="navigation" on:click={modal.toggleOpen}>
				<EllipsisVerticalIcon class="h-6 w-6" />
			</button>
		</div>
	</div>
</nav>

<NavModal bind:this={modal} />
