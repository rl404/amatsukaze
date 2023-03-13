<script lang="ts">
	import Accordion from '$lib/components/Accordion.svelte';
	import ChannelBadge from '$lib/components/badges/ChannelBadge.svelte';
	import Border from '$lib/components/Border.svelte';
	import { channelSorter, formatBirthday, getHostname, isEmptyArray } from '$lib/utils';
	import type { vtuberResponseData } from '../../../api/vtubers/[id]/+server';

	export let data: vtuberResponseData;

	let basicData = [
		['Original Names', isEmptyArray(data.original_names) ? '-' : data.original_names.join('\n')],
		['Nicknames', isEmptyArray(data.nicknames) ? '-' : data.nicknames.join('\n')],
		['Debut Date', !data.debut_date ? '-' : data.debut_date.toString().slice(0, 10)],
		['Retirement Date', !data.retirement_date ? '-' : data.retirement_date.toString().slice(0, 10)],
		['Character Designers', isEmptyArray(data.character_designers) ? '-' : data.character_designers.join('\n')],
		['2D Modeler', isEmptyArray(data.character_2d_modelers) ? '-' : data.character_2d_modelers.join('\n')],
		['3D Modeler', isEmptyArray(data.character_3d_modelers) ? '-' : data.character_3d_modelers.join('\n')],
		['Agencies', isEmptyArray(data.agencies) ? '-' : data.agencies.map((a) => a.name).join('\n')],
		['Affiliations', isEmptyArray(data.affiliations) ? '-' : data.affiliations.join('\n')]
	];

	let personalData = [
		['Gender', data.gender || '-'],
		['Age', !data.age ? '-' : data.age.toLocaleString()],
		['Birthday', formatBirthday(data.birthday)],
		['Height', !data.height ? '-' : data.height.toLocaleString() + ' cm'],
		['Weight', !data.weight ? '-' : data.weight.toLocaleString() + ' kg'],
		['Blood Type', data.blood_type || '-'],
		['Zodiac Sign', data.zodiac_sign || '-']
	];
</script>

<Accordion title="Details" open={true}>
	<div class="grid grid-cols-3 gap-2">
		<Border class="col-span-3">
			<span class="px-4 font-bold whitespace-nowrap">Basic Details</span>
		</Border>
		{#each basicData as d}
			<div class="flex flex-col">
				<div class="font-bold opacity-40">{d[0]}</div>
				<div class="whitespace-pre-line">{d[1]}</div>
			</div>
		{/each}

		<Border class="col-span-3">
			<span class="px-4 font-bold whitespace-nowrap">Media</span>
		</Border>
		<div class="flex flex-col">
			<div class="font-bold opacity-40">Channels</div>
			<div class="grid grid-cols-1 gap-1">
				{#if isEmptyArray(data.channels)}
					-
				{:else}
					{#each data.channels.sort(channelSorter) as channel}
						<div>
							<ChannelBadge type={channel.type} url={channel.url} />
						</div>
					{/each}
				{/if}
			</div>
		</div>
		<div class="flex flex-col">
			<div class="font-bold opacity-40">Social Medias</div>
			<div class="grid grid-cols-1 gap-1">
				{#if isEmptyArray(data.social_medias)}
					-
				{:else}
					{#each data.social_medias as url}
						<div>
							<a href={url} class="underline" target="_blank" rel="noreferrer">{getHostname(url)}</a>
						</div>
					{/each}
				{/if}
			</div>
		</div>
		<div class="flex flex-col">
			<div class="font-bold opacity-40">Official Websites</div>
			<div class="grid grid-cols-1 gap-1">
				{#if isEmptyArray(data.official_websites)}
					-
				{:else}
					{#each data.official_websites as url}
						<div>
							<a href={url} class="underline" target="_blank" rel="noreferrer">{getHostname(url)}</a>
						</div>
					{/each}
				{/if}
			</div>
		</div>

		<Border class="col-span-3">
			<span class="px-4 font-bold whitespace-nowrap">Personal Details</span>
		</Border>
		{#each personalData as d}
			<div class="flex flex-col">
				<div class="font-bold opacity-40">{d[0]}</div>
				<div class="whitespace-pre-line">{d[1]}</div>
			</div>
		{/each}
	</div>
</Accordion>
