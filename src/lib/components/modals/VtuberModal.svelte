<script lang="ts">
	import Border from '$lib/components/commons/Border.svelte';
	import Image from '$lib/components/commons/Image.svelte';
	import Loading from '$lib/components/commons/Loading.svelte';
	import { getAxiosError } from '$lib/utils/api';
	import {
		channelSorter,
		formatBirthday,
		getHostname,
		getWikiImg,
		isEmptyArray
	} from '$lib/utils/utils';
	import axios from 'axios';
	import type { SvelteComponent } from 'svelte';
	import type { VtuberResponseData } from '../../../routes/api/vtubers/[id]/+server';
	import ChannelBadge from '../badges/ChannelBadge.svelte';
	import Modal from './Modal.svelte';

	export let id: number;
	export let name: string;

	let modal: SvelteComponent;
	let data: VtuberResponseData;
	let loading: boolean = true;
	let error: string = '';

	export const toggleOpen = () => {
		modal.toggleOpen();

		loading = true;
		error = '';

		axios
			.get(`/api/vtubers/${id}`)
			.then((resp) => (data = resp.data.data))
			.catch((err) => (error = getAxiosError(err)))
			.finally(() => (loading = false));
	};
</script>

<Modal bind:this={modal} class="max-w-md">
	<div slot="header" class="text-xl font-bold">
		<a href="/vtubers/{id}/{name}" class="clickable">{name}</a>
		<span title="emoji">{data?.emoji || ''}</span>
	</div>

	<div slot="body" class="grid grid-cols-5 gap-4 p-4">
		{#if loading}
			<div class="col-span-5"><Loading class="h-8 w-8" /></div>
		{:else if error !== ''}
			<div class="col-span-5 text-center text-red-500">{error}</div>
		{:else}
			<div class="col-span-5 h-52">
				<Image
					src={getWikiImg(data.image)}
					alt={data.name}
					class="m-auto h-full rounded-lg border border-border bg-card object-contain object-center dark:border-border-dark dark:bg-card-dark"
				/>
			</div>

			<Border class="col-span-5" />

			<div class="subtitle col-span-2 text-right">Original Names</div>
			<div class="col-span-3 flex flex-col">
				{#if isEmptyArray(data.original_names)}
					<span>-</span>
				{:else}
					{#each data.original_names as name}
						<span>{name}</span>
					{/each}
				{/if}
			</div>

			<div class="subtitle col-span-2 text-right">Nicknames</div>
			<div class="col-span-3 flex flex-col">
				{#if isEmptyArray(data.nicknames)}
					<span>-</span>
				{:else}
					{#each data.nicknames as name}
						<span>{name}</span>
					{/each}
				{/if}
			</div>

			<div class="subtitle col-span-2 text-right">Debut Date</div>
			<div class="col-span-3">
				{#if !data.debut_date}
					<span>-</span>
				{:else}
					<span>{data.debut_date.slice(0, 10)}</span>
				{/if}
			</div>

			<div class="subtitle col-span-2 text-right">Retirement Date</div>
			<div class="col-span-3">
				{#if !data.retirement_date}
					<span>-</span>
				{:else}
					<span>{data.retirement_date.slice(0, 10)}</span>
				{/if}
			</div>

			<div class="subtitle col-span-2 text-right">Character Designers</div>
			<div class="col-span-3 flex flex-col">
				{#if isEmptyArray(data.character_designers)}
					<span>-</span>
				{:else}
					{#each data.character_designers as name}
						<a href={`/vtubers?character_designer=${name}`} class="clickable underline">
							{name}
						</a>
					{/each}
				{/if}
			</div>

			<div class="subtitle col-span-2 text-right">2D Modeler</div>
			<div class="col-span-3 flex flex-col">
				{#if isEmptyArray(data.character_2d_modelers)}
					<span>-</span>
				{:else}
					{#each data.character_2d_modelers as name}
						<a href={`/vtubers?character_2d_modeler=${name}`} class="clickable underline">
							{name}
						</a>
					{/each}
				{/if}
			</div>

			<div class="subtitle col-span-2 text-right">3D Modeler</div>
			<div class="col-span-3 flex flex-col">
				{#if isEmptyArray(data.character_3d_modelers)}
					<span>-</span>
				{:else}
					{#each data.character_3d_modelers as name}
						<a href={`/vtubers?character_3d_modeler=${name}`} class="clickable underline">
							{name}
						</a>
					{/each}
				{/if}
			</div>

			<div class="subtitle col-span-2 text-right">Affiliations</div>
			<div class="col-span-3 flex flex-col">
				{#if isEmptyArray(data.affiliations)}
					<span>-</span>
				{:else}
					{#each data.affiliations as name}
						<span>{name}</span>
					{/each}
				{/if}
			</div>

			<div class="subtitle col-span-2 text-right">Channels</div>
			<div class="col-span-3 flex flex-col gap-2">
				{#if isEmptyArray(data.channels)}
					<span>-</span>
				{:else}
					{#each data.channels.sort(channelSorter) as channel}
						<ChannelBadge data={channel} />
					{/each}
				{/if}
			</div>

			<div class="subtitle col-span-2 text-right">Social Medias</div>
			<div class="col-span-3 flex flex-col">
				{#if isEmptyArray(data.social_medias)}
					<span>-</span>
				{:else}
					{#each data.social_medias as url}
						<a
							href={url}
							class="clickable underline"
							target="_blank"
							rel="noreferrer"
							itemprop="url"
						>
							{getHostname(url)}
						</a>
					{/each}
				{/if}
			</div>

			<div class="subtitle col-span-2 text-right">Official Websites</div>
			<div class="col-span-3 flex flex-col">
				{#if isEmptyArray(data.official_websites)}
					<span>-</span>
				{:else}
					{#each data.official_websites as url}
						<a
							href={url}
							class="clickable underline"
							target="_blank"
							rel="noreferrer"
							itemprop="url"
						>
							{getHostname(url)}
						</a>
					{/each}
				{/if}
			</div>

			<div class="subtitle col-span-2 text-right">Gender</div>
			<div class="col-span-3">{data.gender || '-'}</div>

			<div class="subtitle col-span-2 text-right">Age</div>
			<div class="col-span-3">{!data.age ? '-' : data.age.toLocaleString()}</div>

			<div class="subtitle col-span-2 text-right">Birthday</div>
			<div class="col-span-3">{formatBirthday(data.birthday)}</div>

			<div class="subtitle col-span-2 text-right">Height</div>
			<div class="col-span-3">{!data.height ? '-' : data.height.toLocaleString() + ' cm'}</div>

			<div class="subtitle col-span-2 text-right">Weight</div>
			<div class="col-span-3">{!data.weight ? '-' : data.weight.toLocaleString() + ' kg'}</div>

			<div class="subtitle col-span-2 text-right">Blood Type</div>
			<div class="col-span-3">{data.blood_type || '-'}</div>

			<div class="subtitle col-span-2 text-right">Zodiac Sign</div>
			<div class="col-span-3">{data.zodiac_sign || '-'}</div>
		{/if}
	</div>
</Modal>
