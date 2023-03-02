<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import type { vtuberResponseData } from '../../routes/api/vtubers/[id]/+server';
	import { channelSorter, formatBirthday, getAxiosError, getHostname, isEmptyArray } from '$lib/utils';
	import axios from 'axios';
	import Modal from './Modal.svelte';
	import { PUBLIC_VTUBER_WIKI_HOST } from '$env/static/public';
	import ChannelBadge from './ChannelBadge.svelte';
	import VtuberModalLoading from './VtuberModalLoading.svelte';
	import Image from './Image.svelte';

	export let id: number = 0;
	export let title: string = '';

	let modal: SvelteComponent;
	let data: vtuberResponseData;
	let titleData: Array<Array<string>>;
	let loading: boolean = true;
	let error: string = '';

	export const toggleOpen = () => {
		modal.toggleOpen();

		axios
			.get(`/api/vtubers/${id}`)
			.then((resp) => {
				data = resp.data.data;

				titleData = [
					['Original Names', isEmptyArray(data.original_names) ? '-' : data.original_names.join('\n')],
					['Nicknames', isEmptyArray(data.nicknames) ? '-' : data.nicknames.join('\n')],
					['Debut Date', !data.debut_date ? '-' : data.debut_date.toString().slice(0, 10)],
					['Retirement Date', !data.retirement_date ? '-' : data.retirement_date.toString().slice(0, 10)],
					['Character Designers', isEmptyArray(data.character_designers) ? '-' : data.character_designers.join('\n')],
					['2D Modeler', isEmptyArray(data.character_2d_modelers) ? '-' : data.character_2d_modelers.join('\n')],
					['3D Modeler', isEmptyArray(data.character_3d_modelers) ? '-' : data.character_3d_modelers.join('\n')],
					['Agencies', isEmptyArray(data.agencies) ? '-' : data.agencies.map((a) => a.name).join('\n')],
					['Affiliations', isEmptyArray(data.affiliations) ? '-' : data.affiliations.join('\n')],
					['Channels', isEmptyArray(data.channels) ? '-' : ''],
					['Social Medias', isEmptyArray(data.social_medias) ? '-' : ''],
					['Official Websites', isEmptyArray(data.official_websites) ? '-' : ''],
					['Gender', data.gender || '-'],
					['Age', !data.age ? '-' : data.age.toLocaleString()],
					['Birthday', formatBirthday(data.birthday)],
					['Height', !data.height ? '-' : data.height.toLocaleString() + ' cm'],
					['Weight', !data.weight ? '-' : data.weight.toLocaleString() + ' kg'],
					['Blood Type', data.blood_type || '-'],
					['Zodiac Sign', data.zodiac_sign || '-']
				];
			})
			.catch((err) => {
				error = getAxiosError(err);
			})
			.finally(() => {
				loading = false;
			});
	};
</script>

<Modal bind:this={modal}>
	<span slot="title">
		<a class="hover:opacity-70" href="{PUBLIC_VTUBER_WIKI_HOST}/wiki/{title}" target="_blank" rel="noreferrer">{title}</a>
		<span title="Emoji">{data?.emoji}</span>
	</span>

	<div slot="body" class="p-4">
		{#if loading}
			<VtuberModalLoading />
		{:else if error !== ''}
			<div class="text-red-500 text-center">
				{error}
			</div>
		{:else}
			<div class="grid grid-cols-5 gap-4">
				{#if data.image !== ''}
					<div class="col-span-5 h-52">
						<Image
							src="/api/wikia/image/{data.image.split('?')[0]}?height=206"
							alt={data.name}
							class="m-auto h-52 rounded-lg border dark:border-neutral-600 bg-white"
						/>
					</div>
					<div class="col-span-5 border-t dark:border-neutral-600" />
				{/if}
				{#each titleData as d}
					<div class="col-span-2 text-right opacity-40">{d[0]}</div>
					<div class="col-span-3 whitespace-pre-line">
						{#if d[0] === 'Channels' && d[1] !== '-'}
							<div class="grid grid-cols-1 gap-1">
								{#each data.channels.sort(channelSorter) as channel}
									<div>
										<ChannelBadge type={channel.type} url={channel.url} />
									</div>
								{/each}
							</div>
						{:else if d[0] === 'Social Medias' && d[1] !== '-'}
							<div class="grid grid-cols-1 gap-1">
								{#each data.social_medias as url}
									<div>
										<a href={url} class="hover:opacity-50 underline" target="_blank" rel="noreferrer">{getHostname(url)}</a>
									</div>
								{/each}
							</div>
						{:else if d[0] === 'Official Websites' && d[1] !== '-'}
							<div class="grid grid-cols-1 gap-1">
								{#each data.official_websites as url}
									<div>
										<a href={url} class="hover:opacity-50 underline" target="_blank" rel="noreferrer">{getHostname(url)}</a>
									</div>
								{/each}
							</div>
						{:else}
							{d[1]}
						{/if}
					</div>
				{/each}
			</div>
		{/if}
	</div>

	<div slot="footer" class="sticky bottom-0 bg-white dark:bg-neutral-700 p-4 border-t dark:border-neutral-600 flex justify-between gap-2">
		{#if !loading && error === '' && data}
			<span class="text-ellipsis whitespace-nowrap overflow-hidden italic opacity-50" title={data.caption}>{data.caption}</span>
			<div class="flex text-white text-xs font-medium gap-2">
				{#if data.has_2d}
					<span class="bg-blue-500 px-2.5 py-0.5 rounded-full" title="Has 2D model">2D</span>
				{/if}
				{#if data.has_3d}
					<span class="bg-purple-500 px-2.5 py-0.5 rounded-full" title="Has 3D model">3D</span>
				{/if}
				{#if data.retirement_date}
					<span class="bg-red-500 px-2.5 py-0.5 rounded-full" title="Has retired">Retired</span>
				{/if}
			</div>
		{/if}
	</div>
</Modal>
