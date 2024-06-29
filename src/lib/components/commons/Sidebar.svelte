<script lang="ts">
	import { page } from '$app/stores';
	import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from 'flowbite-svelte';
	import { twMerge } from 'tailwind-merge';
	import CalendarIcon from '../icons/CalendarIcon.svelte';
	import ChartIcon from '../icons/ChartIcon.svelte';
	import OfficeIcon from '../icons/OfficeIcon.svelte';
	import UserIcon from '../icons/UserIcon.svelte';

	export let drawer: boolean;

	$: activeUrl = $page.url.pathname;

	const iconClass = 'size-5 text-gray-500 transition group-hover:text-primary dark:text-gray-400';
	const itemClass = 'group transition hover:bg-gray-200 dark:hover:bg-gray-700';

	const links = [
		{ label: 'Vtubers', icon: UserIcon, href: '/vtubers' },
		{ label: 'Agencies', icon: OfficeIcon, href: '/agencies' },
		{ label: 'Events', icon: CalendarIcon, href: '/events' },
		{ label: 'Statistics', icon: ChartIcon, href: '/statistics' }
	];

	const toggleDrawer = () => (drawer = !drawer);
</script>

<Sidebar
	{activeUrl}
	class={!drawer ? 'hidden' : ''}
	asideClass="fixed z-30 h-full w-64 overflow-y-auto border-e border-border bg-white dark:bg-gray-800 lg:block"
>
	<SidebarWrapper>
		<SidebarGroup>
			{#each links as { label, icon, href }}
				<SidebarItem {label} {href} class={itemClass}>
					<svelte:component this={icon} slot="icon" class={iconClass} />
				</SidebarItem>
			{/each}
		</SidebarGroup>
	</SidebarWrapper>
</Sidebar>

<button
	class={twMerge(
		'fixed inset-0 z-20 bg-gray-900/50 dark:bg-gray-900/60 lg:hidden',
		!drawer && 'hidden'
	)}
	on:click={toggleDrawer}
/>
