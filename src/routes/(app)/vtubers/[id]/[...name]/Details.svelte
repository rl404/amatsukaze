<script lang="ts">
	import ChannelBadge from '$lib/components/badges/ChannelBadge.svelte';
	import {
		channelSorter,
		formatBirthday,
		getHostname,
		isEmptyArray,
		toURL
	} from '$lib/utils/utils';
	import { Card, P } from 'flowbite-svelte';
	import type { VtuberResponseData } from '../../../../api/vtubers/[id]/+server';

	export let vtuber: VtuberResponseData;
</script>

<div class="grid gap-2 sm:gap-4">
	<Card size="none" class="gap-4">
		<h3 class="h3 border-l-4 border-primary-500 pl-2">Basic Details</h3>
		<div class="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
			<div>
				<h4 class="font-bold">Original Names</h4>
				{#if isEmptyArray(vtuber.original_names)}
					<P>-</P>
				{:else}
					{#each vtuber.original_names as name}
						<P>{name}</P>
					{/each}
				{/if}
			</div>
			<div>
				<h4 class="font-bold">Nicknames</h4>
				{#if isEmptyArray(vtuber.nicknames)}
					<P>-</P>
				{:else}
					{#each vtuber.nicknames as name}
						<P>{name}</P>
					{/each}
				{/if}
			</div>
			<div>
				<h4 class="font-bold">Debut Date</h4>
				<P>{!vtuber.debut_date ? '-' : vtuber.debut_date.slice(0, 10)}</P>
			</div>
			<div>
				<h4 class="font-bold">Retirement Date</h4>
				<P>{!vtuber.retirement_date ? '-' : vtuber.retirement_date.slice(0, 10)}</P>
			</div>
			<div>
				<h4 class="font-bold">Character Designers</h4>
				{#if isEmptyArray(vtuber.character_designers)}
					<P>-</P>
				{:else}
					{#each vtuber.character_designers as name}
						<P>
							<a href={`/vtubers?character_designer=${name}`} class="clickable underline">
								{name}
							</a>
						</P>
					{/each}
				{/if}
			</div>
			<div>
				<h4 class="font-bold">2D Modeler</h4>
				{#if isEmptyArray(vtuber.character_2d_modelers)}
					<P>-</P>
				{:else}
					{#each vtuber.character_2d_modelers as name}
						<P>
							<a href={`/vtubers?character_2d_modeler=${name}`} class="clickable underline">
								{name}
							</a>
						</P>
					{/each}
				{/if}
			</div>
			<div>
				<h4 class="font-bold">3D Modeler</h4>
				{#if isEmptyArray(vtuber.character_3d_modelers)}
					<P>-</P>
				{:else}
					{#each vtuber.character_3d_modelers as name}
						<P>
							<a href={`/vtubers?character_3d_modeler=${name}`} class="clickable underline">
								{name}
							</a>
						</P>
					{/each}
				{/if}
			</div>
			<div>
				<h4 class="font-bold">Agencies</h4>
				{#if isEmptyArray(vtuber.agencies)}
					<P>-</P>
				{:else}
					{#each vtuber.agencies as agency}
						<P>
							<a href={`/agencies/${agency.id}/${toURL(agency.name)}`} class="clickable underline">
								{agency.name}
							</a>
						</P>
					{/each}
				{/if}
			</div>
			<div>
				<h4 class="font-bold">Affiliations</h4>
				{#if isEmptyArray(vtuber.affiliations)}
					<P>-</P>
				{:else}
					{#each vtuber.affiliations as name}
						<P>{name}</P>
					{/each}
				{/if}
			</div>
			<div>
				<h4 class="font-bold">Languages</h4>
				{#if isEmptyArray(vtuber.languages)}
					<P>-</P>
				{:else}
					{#each vtuber.languages as language}
						<P>{language.name}</P>
					{/each}
				{/if}
			</div>
		</div>
	</Card>

	<Card size="none" class="gap-4">
		<h3 class="h3 border-l-4 border-primary-500 pl-2">Medias</h3>
		<div class="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
			<div>
				<h4 class="font-bold">Channels</h4>
				{#if isEmptyArray(vtuber.channels)}
					<P>-</P>
				{:else}
					<div class="flex flex-col">
						{#each vtuber.channels.sort(channelSorter) as channel}
							<div>
								<ChannelBadge data={channel} />
							</div>
						{/each}
					</div>
				{/if}
			</div>
			<div>
				<h4 class="font-bold">Social Medias</h4>
				{#if isEmptyArray(vtuber.social_medias)}
					<P>-</P>
				{:else}
					{#each vtuber.social_medias as url}
						<P>
							<a href={url} class="clickable underline" target="_blank" rel="noreferrer">
								{getHostname(url)}
							</a>
						</P>
					{/each}
				{/if}
			</div>
			<div>
				<h4 class="font-bold">Official Websites</h4>
				{#if isEmptyArray(vtuber.official_websites)}
					<P>-</P>
				{:else}
					{#each vtuber.official_websites as url}
						<P>
							<a href={url} class="clickable underline" target="_blank" rel="noreferrer">
								{getHostname(url)}
							</a>
						</P>
					{/each}
				{/if}
			</div>
		</div>
	</Card>

	<Card size="none" class="gap-4">
		<h3 class="h3 border-l-4 border-primary-500 pl-2">Personal Details</h3>
		<div class="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
			<div>
				<h4 class="font-bold">Gender</h4>
				<P>{vtuber.gender || '-'}</P>
			</div>
			<div>
				<h4 class="font-bold">Age</h4>
				<P>{!vtuber.age ? '-' : vtuber.age.toLocaleString()}</P>
			</div>
			<div>
				<h4 class="font-bold">Birthday</h4>
				<P>{formatBirthday(vtuber.birthday)}</P>
			</div>
			<div>
				<h4 class="font-bold">Height</h4>
				<P>{!vtuber.height ? '-' : vtuber.height.toLocaleString() + ' cm'}</P>
			</div>
			<div>
				<h4 class="font-bold">Weight</h4>
				<P>{!vtuber.weight ? '-' : vtuber.weight.toLocaleString() + ' kg'}</P>
			</div>
			<div>
				<h4 class="font-bold">Blood Type</h4>
				<P>{vtuber.blood_type || '-'}</P>
			</div>
			<div>
				<h4 class="font-bold">Zodiac Sign</h4>
				<P>{vtuber.zodiac_sign || '-'}</P>
			</div>
		</div>
	</Card>
</div>
