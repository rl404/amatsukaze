<script lang="ts">
	import logo from '$lib/assets/logo.png';
	import GithubIcon from '$lib/components/icons/GithubIcon.svelte';
	import { Avatar, Button, Navbar, NavBrand, NavHamburger, Span } from 'flowbite-svelte';
	import DarkMode from './DarkMode.svelte';

	export let drawer: boolean;

	const toggleDrawer = () => (drawer = !drawer);
</script>

<Navbar
	fluid
	class="to-primary-100 dark:to-primary-950 bg-gradient-to-r from-white transition dark:from-gray-800"
>
	<NavHamburger onclick={toggleDrawer} class="m-0 hover:text-black md:block lg:hidden" />
	<NavBrand href="/">
		<Avatar src={logo} alt="amatsukaze" class="me-2 size-7 sm:size-9" />
		<Span class="h3 whitespace-nowrap">Amatsukaze</Span>
	</NavBrand>
	<div>
		<DarkMode />
		<Button
			class="border-none bg-transparent p-2.5 text-gray-500 focus-within:ring-0 hover:text-black dark:bg-transparent"
			color="alternative"
			href="https://github.com/rl404/amatsukaze"
			target="_blank"
			rel="noreferrer"
		>
			<GithubIcon class="size-5" />
		</Button>
	</div>
</Navbar>
