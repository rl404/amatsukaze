<script lang="ts">
	import { page } from '$app/stores';
	import { toURL } from '$lib/utils/utils';
	import axios from 'axios';
	import {
		Sidebar,
		SidebarDropdownItem,
		SidebarDropdownWrapper,
		SidebarGroup,
		SidebarItem,
		SidebarWrapper
	} from 'flowbite-svelte';
	import type { ComponentType } from 'svelte';
	import { onMount } from 'svelte';
	import { twMerge } from 'tailwind-merge';
	import type { VtuberResponseData } from '../../../routes/api/vtubers/[id]/+server';
	import CakeIcon from '../icons/CakeIcon.svelte';
	import CalendarIcon from '../icons/CalendarIcon.svelte';
	import ChartIcon from '../icons/ChartIcon.svelte';
	import GiftIcon from '../icons/GiftIcon.svelte';
	import LineChartIcon from '../icons/LineChartIcon.svelte';
	import OfficeIcon from '../icons/OfficeIcon.svelte';
	import StarIcon from '../icons/StarIcon.svelte';
	import UserIcon from '../icons/UserIcon.svelte';
	import UserMinusIcon from '../icons/UserMinusIcon.svelte';
	import UserPlusIcon from '../icons/UserPlusIcon.svelte';

	export let drawer: boolean;

	$: activeUrl = $page.url.pathname;

	const today = new Date();
	const lastYear = new Date(today.getFullYear() - 1, today.getMonth(), today.getDay());
	const iconClass = 'size-5 text-gray-500 transition group-hover:text-primary dark:text-gray-400';
	const itemClass = 'group transition hover:bg-gray-200 dark:hover:bg-gray-700';

	const links = [
		{ label: 'Vtubers', icon: UserIcon, href: '/vtubers' },
		{ label: 'Agencies', icon: OfficeIcon, href: '/agencies' },
		{ label: 'Events', icon: CalendarIcon, href: '/events' },
		{ label: 'Statistics', icon: ChartIcon, href: '/statistics' }
	];

	const toggleDrawer = () => (drawer = !drawer);

	const moreData: {
		label: string;
		icon: ComponentType;
		api: string;
		more: string;
		data: VtuberResponseData[];
	}[] = [
		{
			label: "Today's Birthday",
			icon: CakeIcon,
			api: `/api/vtubers?sort=name&birthday_day=${today.getDay()}&start_birthday_month=${today.getMonth() + 1}&end_birthday_month=${today.getMonth() + 1}&limit=5&mode=simple`,
			more: '/events',
			data: []
		},
		{
			label: "Today's Anniversary",
			icon: GiftIcon,
			api: `/api/vtubers?sort=name&debut_day=${today.getDay()}&start_debut_month=${today.getMonth() + 1}&end_debut_month=${today.getMonth() + 1}&limit=5&mode=simple`,
			more: '/events',
			data: []
		},
		{
			label: 'Rising Stars',
			icon: LineChartIcon,
			api: `/api/vtubers?sort=-monthly_subscriber&start_debut_year=${lastYear.getFullYear()}&limit=5&mode=simple`,
			more: `/vtubers?sort=-monthly_subscriber&start_debut_year=${lastYear.getFullYear()}`,
			data: []
		},
		{
			label: 'Most Subscriber',
			icon: StarIcon,
			api: '/api/vtubers?sort=-subscriber&limit=5&mode=simple',
			more: '/vtubers?sort=-subscriber',
			data: []
		},
		{
			label: 'New Debuts',
			icon: UserPlusIcon,
			api: '/api/vtubers?sort=-debut_date&limit=5&mode=simple',
			more: '/vtubers?sort=-debut_date',
			data: []
		},
		{
			label: 'Recently Retired',
			icon: UserMinusIcon,
			api: '/api/vtubers?sort=-retirement_date&limit=5&mode=simple',
			more: '/vtubers?sort=-retirement_date',
			data: []
		}
	];

	onMount(() => {
		moreData.forEach((d, i) => {
			axios.get(d.api).then((resp) => (moreData[i] = { ...moreData[i], data: resp.data.data }));
		});
	});
</script>

<Sidebar
	{activeUrl}
	class={!drawer ? 'hidden' : ''}
	asideClass="fixed z-30 h-full w-64 overflow-y-auto border-e border-border bg-white pb-12 dark:bg-gray-800 lg:block"
>
	<SidebarWrapper>
		<SidebarGroup>
			{#each links as { label, icon, href }}
				<SidebarItem {label} {href} class={itemClass}>
					<svelte:component this={icon} slot="icon" class={iconClass} />
				</SidebarItem>
			{/each}
		</SidebarGroup>
		{#each moreData as { label, icon, more, data }}
			{#if data.length > 0}
				<SidebarGroup border>
					<SidebarDropdownWrapper {label}>
						<svelte:component this={icon} slot="icon" class={iconClass} />
						{#each data as vtuber}
							<SidebarDropdownItem
								label={`${vtuber.name} ${vtuber.emoji} `}
								href={`/vtubers/${vtuber.id}/${toURL(vtuber.name)}`}
								class={itemClass}
							/>
						{/each}
						<SidebarDropdownItem label="...show more..." href={more} class={itemClass} />
					</SidebarDropdownWrapper>
				</SidebarGroup>
			{/if}
		{/each}
	</SidebarWrapper>
</Sidebar>

<button
	class={twMerge(
		'fixed inset-0 z-20 bg-gray-900/50 dark:bg-gray-900/60 lg:hidden',
		!drawer && 'hidden'
	)}
	on:click={toggleDrawer}
/>
