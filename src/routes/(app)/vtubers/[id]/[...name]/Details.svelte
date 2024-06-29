<script lang="ts">
	import ChannelBadge from '$lib/components/badges/ChannelBadge.svelte';
	import { channelSorter, formatBirthday, getHostname, isEmptyArray } from '$lib/utils/utils';
	import { Card, P } from 'flowbite-svelte';
	import type { VtuberResponseData } from '../../../../api/vtubers/[id]/+server';

	export let vtuber: VtuberResponseData;
</script>

<div class="grid gap-2 sm:gap-4">
	<Card size="none" class="gap-4">
		<h3>Basic Details</h3>
		<div class="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
			<div>
				<div class="font-bold">Original Names</div>
				{#if isEmptyArray(vtuber.original_names)}
					<P>-</P>
				{:else}
					{#each vtuber.original_names as name}
						<P>{name}</P>
					{/each}
				{/if}
			</div>
			<div>
				<div class="font-bold">Nicknames</div>
				{#if isEmptyArray(vtuber.nicknames)}
					<P>-</P>
				{:else}
					{#each vtuber.nicknames as name}
						<P>{name}</P>
					{/each}
				{/if}
			</div>
			<div>
				<div class="font-bold">Debut Date</div>
				<P>{!vtuber.debut_date ? '-' : vtuber.debut_date.slice(0, 10)}</P>
			</div>
			<div>
				<div class="font-bold">Retirement Date</div>
				<P>{!vtuber.retirement_date ? '-' : vtuber.retirement_date.slice(0, 10)}</P>
			</div>
			<div>
				<div class="font-bold">Character Designers</div>
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
				<div class="font-bold">2D Modeler</div>
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
				<div class="font-bold">3D Modeler</div>
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
				<div class="font-bold">Agencies</div>
				{#if isEmptyArray(vtuber.agencies)}
					<P>-</P>
				{:else}
					{#each vtuber.agencies as agency}
						<P>
							<a href={`/agencies/${agency.id}/${agency.name}`} class="clickable underline">
								{agency.name}
							</a>
						</P>
					{/each}
				{/if}
			</div>
			<div>
				<div class="font-bold">Affiliations</div>
				{#if isEmptyArray(vtuber.affiliations)}
					<P>-</P>
				{:else}
					{#each vtuber.affiliations as name}
						<P>{name}</P>
					{/each}
				{/if}
			</div>
		</div>
	</Card>

	<Card size="none" class="gap-4">
		<h3>Medias</h3>
		<div class="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
			<div>
				<div class="font-bold">Channels</div>
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
				<div class="font-bold">Social Medias</div>
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
				<div class="font-bold">Official Websites</div>
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
		<h3>Personal Details</h3>
		<div class="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
			<div>
				<div class="font-bold">Gender</div>
				<P>{vtuber.gender || '-'}</P>
			</div>
			<div>
				<div class="font-bold">Age</div>
				<P>{!vtuber.age ? '-' : vtuber.age.toLocaleString()}</P>
			</div>
			<div>
				<div class="font-bold">Birthday</div>
				<P>{formatBirthday(vtuber.birthday)}</P>
			</div>
			<div>
				<div class="font-bold">Height</div>
				<P>{!vtuber.height ? '-' : vtuber.height.toLocaleString() + ' cm'}</P>
			</div>
			<div>
				<div class="font-bold">Weight</div>
				<P>{!vtuber.weight ? '-' : vtuber.weight.toLocaleString() + ' kg'}</P>
			</div>
			<div>
				<div class="font-bold">Blood Type</div>
				<P>{vtuber.blood_type || '-'}</P>
			</div>
			<div>
				<div class="font-bold">Zodiac Sign</div>
				<P>{vtuber.zodiac_sign || '-'}</P>
			</div>
		</div>
	</Card>
</div>
