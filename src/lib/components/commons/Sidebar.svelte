<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import CakeIcon from '$lib/components/icons/CakeIcon.svelte';
	import CalendarIcon from '$lib/components/icons/CalendarIcon.svelte';
	import ChartIcon from '$lib/components/icons/ChartIcon.svelte';
	import GiftIcon from '$lib/components/icons/GiftIcon.svelte';
	import LineChartIcon from '$lib/components/icons/LineChartIcon.svelte';
	import OfficeIcon from '$lib/components/icons/OfficeIcon.svelte';
	import StarIcon from '$lib/components/icons/StarIcon.svelte';
	import UserGroupIcon from '$lib/components/icons/UserGroupIcon.svelte';
	import UserIcon from '$lib/components/icons/UserIcon.svelte';
	import UserMinusIcon from '$lib/components/icons/UserMinusIcon.svelte';
	import UserPlusIcon from '$lib/components/icons/UserPlusIcon.svelte';
	import VideoIcon from '$lib/components/icons/VideoIcon.svelte';
	import { toURL } from '$lib/utils/utils';
	import axios from 'axios';
	import { Sidebar, SidebarDropdownWrapper, SidebarGroup, SidebarItem } from 'flowbite-svelte';
	import { onMount, type Component } from 'svelte';
	import type { VtuberResponseData } from '../../../routes/api/vtubers/[id]/+server';

	export let drawer: boolean;

	let activeUrl: string = '/';

	const today = new Date();
	const lastYear = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());

	const links = [
		{ label: 'Vtubers', icon: UserIcon, href: '/vtubers' },
		{ label: 'Agencies', icon: OfficeIcon, href: '/agencies' },
		{ label: 'Streams & Videos', icon: VideoIcon, href: '/videos' },
		{ label: 'Events', icon: CalendarIcon, href: '/events' },
		{ label: 'Statistics', icon: ChartIcon, href: '/statistics' },
		{ label: 'Comparison', icon: UserGroupIcon, href: '/comparison' }
	];

	const toggleDrawer = () => (drawer = !drawer);

	const moreData: {
		label: string;
		icon: Component;
		api: string;
		more: string;
		data: VtuberResponseData[];
	}[] = [
		{
			label: "Today's Birthday",
			icon: CakeIcon,
			api: `/api/vtubers?sort=name&exclude_retired=true&birthday_day=${today.getDate()}&start_birthday_month=${today.getMonth() + 1}&end_birthday_month=${today.getMonth() + 1}&limit=5&mode=simple`,
			more: '/events',
			data: []
		},
		{
			label: "Today's Anniversary",
			icon: GiftIcon,
			api: `/api/vtubers?sort=name&exclude_retired=true&debut_day=${today.getDate()}&start_debut_month=${today.getMonth() + 1}&end_debut_month=${today.getMonth() + 1}&limit=5&mode=simple`,
			more: '/events',
			data: []
		},
		{
			label: 'Rising Stars',
			icon: LineChartIcon,
			api: `/api/vtubers?sort=-monthly_subscriber&exclude_retired=true&start_debut_year=${lastYear.getFullYear()}&limit=5&mode=simple`,
			more: `/vtubers?sort=-monthly_subscriber&exclude_retired=true&start_debut_year=${lastYear.getFullYear()}`,
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

	afterNavigate(() => {
		activeUrl = '/' + page.url.pathname.split('/')[1];
	});
</script>

<Sidebar
	{activeUrl}
	isOpen={drawer}
	closeSidebar={toggleDrawer}
	breakpoint="lg"
	isSingle={false}
	backdrop={false}
	class="border-border top-15.2 h-full overflow-y-auto border-e pb-32"
>
	<SidebarGroup>
		{#each links as { label, icon: _icon, href }}
			<SidebarItem {label} {href} class="group">
				{#snippet icon()}
					<svelte:component
						this={_icon}
						class="group-hover:text-primary size-5 text-gray-500 transition dark:text-gray-400"
					/>
				{/snippet}
			</SidebarItem>
		{/each}
	</SidebarGroup>
	{#each moreData as { label, icon: _icon, more, data }}
		{#if data.length > 0}
			<SidebarGroup border>
				<SidebarDropdownWrapper {label}>
					{#snippet icon()}
						<svelte:component
							this={_icon}
							class="group-hover:text-primary size-5 text-gray-500 transition dark:text-gray-400"
						/>
					{/snippet}
					{#each data as vtuber}
						<SidebarItem
							label={`${vtuber.name} ${vtuber.emoji} `}
							href={`/vtubers/${vtuber.id}/${toURL(vtuber.name)}`}
						/>
					{/each}
					<SidebarItem label="...show more..." href={more} />
				</SidebarDropdownWrapper>
			</SidebarGroup>
		{/if}
	{/each}
</Sidebar>
