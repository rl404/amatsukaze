<script lang="ts">
	import logo from '$lib/assets/logo.png';
	import { Avatar, Button, NavBrand, NavHamburger, Navbar, Span } from 'flowbite-svelte';
	import GithubIcon from '../icons/GithubIcon.svelte';
	import DarkMode from './DarkMode.svelte';

	export let drawer: boolean;

	const toggleDrawer = () => (drawer = !drawer);
</script>

<Navbar
	fluid
	class="to-primary-100 dark:to-primary-950 bg-gradient-to-r from-white dark:from-gray-800"
>
	<NavHamburger
		onClick={toggleDrawer}
		class="m-0 hover:text-black md:block lg:hidden dark:hover:text-white"
	/>
	<NavBrand href="/">
		<Avatar src={logo} alt="amatsukaze" size="none" class="me-2 h-6 sm:h-9" />
		<Span class="text-xl whitespace-nowrap sm:text-2xl">Amatsukaze</Span>
	</NavBrand>
	<div>
		<DarkMode />
		<Button
			class="border-none bg-transparent !p-2.5 text-gray-500 focus-within:ring-0 hover:text-black"
			color="alternative"
			href="https://github.com/rl404/amatsukaze"
			target="_blank"
			rel="noreferrer"
		>
			<GithubIcon class="size-5" />
		</Button>
	</div>
</Navbar>
