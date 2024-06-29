<script lang="ts">
	import logo from '$lib/assets/logo.png';
	import { Avatar, Button, NavBrand, NavHamburger, Navbar, Span } from 'flowbite-svelte';
	import GithubIcon from '../icons/GithubIcon.svelte';
	import DarkMode from './DarkMode.svelte';

	export let drawer: boolean;

	const toggleDrawer = () => (drawer = !drawer);
</script>

<Navbar fluid color="default">
	<NavHamburger onClick={toggleDrawer} class="m-0 md:block lg:hidden" />
	<NavBrand href="/">
		<Avatar src={logo} alt="amatsukaze" size="none" class="me-2 h-6 sm:h-9" />
		<Span class="whitespace-nowrap text-xl sm:text-2xl">Amatsukaze</Span>
	</NavBrand>
	<div>
		<DarkMode />
		<Button
			class="border-none !p-2.5 focus-within:ring-0"
			color="alternative"
			href="https://github.com/rl404/amatsukaze"
			target="_blank"
			rel="noreferrer"
		>
			<GithubIcon class="size-5" />
		</Button>
	</div>
</Navbar>
