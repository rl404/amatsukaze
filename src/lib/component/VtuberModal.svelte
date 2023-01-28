<script lang="ts">
	import { PUBLIC_VTUBER_WIKI_HOST } from '$env/static/public';
	import { createEventDispatcher } from 'svelte';
	import axios from 'axios';
	import type { Data } from 'src/routes/api/vtubers/[id]/+server';
	import ChannelBadge from '$lib/component/ChannelBadge.svelte';

	export let open = false;
	export let id = 0;
	export let title = '';

	export let x = 0;
	export let y = 0;
	export let z = 0;

	const MODAL_MOVE_PADDING = 20;

	let modal: HTMLElement;

	const dispatch = createEventDispatcher();

	const onDragged = (node: HTMLElement) => {
		let moving = false;

		node.addEventListener('mousedown', () => {
			moving = true;
		});

		window.addEventListener('mousemove', (e: MouseEvent) => {
			if (!moving) return;
			if (x + e.movementX <= MODAL_MOVE_PADDING || y + e.movementY <= MODAL_MOVE_PADDING) return;
			if (
				x + e.movementX + modal.offsetWidth >= screen.width - MODAL_MOVE_PADDING ||
				y + e.movementY + modal.offsetHeight >= screen.height - MODAL_MOVE_PADDING
			)
				return;
			dispatch('move', { id: id, x: e.movementX, y: e.movementY });
		});

		window.addEventListener('mouseup', () => {
			moving = false;
		});
	};

	$: id && getData(id);

	type ModalData = {
		id: number;
		name: string;
		image: string;
		originalNames: Array<string>;
		nicknames: Array<string>;
		caption: string;
		debutDate?: Date;
		retirementDate?: Date;
		has2d: boolean;
		has3d: boolean;
		characterDesigners: Array<string>;
		character2dModelers: Array<string>;
		character3dModelers: Array<string>;
		agencies: Array<string>;
		affiliations: Array<string>;
		channels: Array<{ type: string; url: string }>;
		socialMedias: Array<string>;
		officialWebsites: Array<string>;
		gender: string;
		age?: number;
		birthday?: Date;
		height?: number;
		weight?: number;
		bloodType: string;
		zodiacSign: string;
		emoji: string;
	};

	let data: ModalData | null | undefined;
	let isLoading = true;
	let error = '';

	const getData = async (id: number) => {
		data = null;
		isLoading = true;
		error = '';

		if (id <= 0) {
			isLoading = false;
			return;
		}

		axios
			.get(`/api/vtubers/${id}`)
			.then((resp) => {
				const d: Data = resp.data.data;

				data = {
					id: d.id,
					name: d.name,
					image: d.image || '',
					originalNames: d.original_names || ['-'],
					nicknames: d.nicknames || ['-'],
					caption: d.caption,
					debutDate: d.debut_date,
					retirementDate: d.retirement_date,
					has2d: d.has_2d,
					has3d: d.has_3d,
					characterDesigners: d.character_designers || ['-'],
					character2dModelers: d.character_2d_modelers || ['-'],
					character3dModelers: d.character_3d_modelers || ['-'],
					agencies: d.agencies?.map((a: { id: number; name: string; image: string }) => {
						return a.name;
					}) || ['-'],
					affiliations: d.affiliations || ['-'],
					channels:
						d.channels?.map((c: { type: string; url: string }) => {
							return {
								type: c.type,
								url: c.url
							};
						}) || [],
					socialMedias: d.social_medias || [],
					officialWebsites: d.official_websites || [],
					gender: d.gender,
					age: d.age,
					birthday: d.birthday,
					height: d.height,
					weight: d.weight,
					bloodType: d.blood_type || '-',
					zodiacSign: d.zodiac_sign || '-',
					emoji: d.emoji
				};
			})
			.catch((err) => {
				if (err.response) {
					if (err.response.error) {
						error = err.response.error;
						return;
					}
					if (err.response.message) {
						error = err.response.message;
						return;
					}
				}
				error = err.message;
			})
			.finally(() => {
				isLoading = false;
			});
	};

	const formatBirthday = (d: Date | undefined): string => {
		if (!d) return '-';

		const monthNames = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		];

		const dd = new Date(d);

		const day = dd.getDate();
		const month = monthNames[dd.getMonth()];

		return month + ' ' + day;
	};

	const getHostname = (url: string): string => {
		return new URL(url).hostname.replace('www.', '');
	};
</script>

{#if open}
	<div
		class="absolute w-1/4 bg-white rounded-lg shadow-xl overflow-auto resize"
		style="top:{y}px;left:{x}px;z-index:{z};height:{id > 0
			? 305
			: 105}px;min-height:52px;width:355px;min-width:300px;max-height:calc(100% - {y}px - {MODAL_MOVE_PADDING}px);max-width:calc(100% - {x}px - {MODAL_MOVE_PADDING}px);"
		bind:this={modal}
	>
		<div
			class="flex justify-between items-center bg-yellow-500 p-3 text-xl font-bold cursor-move text-white sticky top-0 z-10"
			use:onDragged
		>
			<a
				class="hover:text-yellow-200 text-ellipsis whitespace-nowrap overflow-hidden"
				href="{PUBLIC_VTUBER_WIKI_HOST}/wiki/{title}"
				target="_blank"
				rel="noreferrer">{title} <span title="Emoji">{data?.emoji || ''}</span></a
			>
			<button
				class="p-1 bg-white hover:bg-yellow-200 rounded-full ml-4"
				on:click={() => dispatch('close')}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="20px"
					viewBox="0 0 24 24"
					width="20px"
					fill="#000000"
					><path d="M0 0h24v24H0V0z" fill="none" /><path
						d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
					/></svg
				>
			</button>
		</div>
		{#if isLoading}
			<div class="p-3">Loading...</div>
		{:else if id <= 0}
			<div class="p-3">No vtuber data.</div>
		{:else if error !== ''}
			<div class="p-3 text-red-600">
				{error}
			</div>
		{:else if data === undefined || data === null}
			<div class="p-3 text-red-600">Something wrong...</div>
		{:else}
			<div class="p-3">
				<div class="grid grid-cols-5 gap-3">
					{#if data.image !== ''}
						<div class="col-span-5">
							<img
								src="/api/wikia/image/{data.image}"
								alt={data.name}
								class="m-auto mb-3 rounded-lg border-solid border-2 border-yellow-100"
								style="height:200px;"
							/>
							<hr />
						</div>
					{/if}
					<div class="col-span-2 text-right text-gray-400">Original Names</div>
					<div class="col-span-3 whitespace-pre-line">{data.originalNames.join('\n')}</div>
					<div class="col-span-2 text-right text-gray-400">Nicknames</div>
					<div class="col-span-3 whitespace-pre-line">{data.nicknames.join('\n')}</div>
					<div class="col-span-2 text-right text-gray-400">Debut Date</div>
					<div class="col-span-3">{data.debutDate?.toString().slice(0, 10) || '-'}</div>
					<div class="col-span-2 text-right text-gray-400">Retirement Date</div>
					<div class="col-span-3">{data.retirementDate?.toString().slice(0, 10) || '-'}</div>
					<div class="col-span-2 text-right text-gray-400">Character Designers</div>
					<div class="col-span-3 whitespace-pre-line">{data.characterDesigners.join('\n')}</div>
					<div class="col-span-2 text-right text-gray-400">2D Modeler</div>
					<div class="col-span-3 whitespace-pre-line">{data.character2dModelers.join('\n')}</div>
					<div class="col-span-2 text-right text-gray-400">3D Modeler</div>
					<div class="col-span-3 whitespace-pre-line">{data.character3dModelers.join('\n')}</div>
					<div class="col-span-2 text-right text-gray-400">Agencies</div>
					<div class="col-span-3 whitespace-pre-line">
						{#if data.agencies.length === 0}
							-
						{:else}
							{data.agencies.join('\n')}
						{/if}
					</div>
					<div class="col-span-2 text-right text-gray-400">Affiliations</div>
					<div class="col-span-3 whitespace-pre-line">{data.affiliations.join('\n')}</div>
					<div class="col-span-2 text-right text-gray-400">Channels</div>
					<div class="col-span-3 whitespace-pre-line">
						{#if data.channels.length === 0}
							-
						{:else}
							<div class="grid grid-cols-1">
								{#each data.channels as channel}
									<div>
										<ChannelBadge type={channel.type} url={channel.url} />
									</div>
								{/each}
							</div>
						{/if}
					</div>
					<div class="col-span-2 text-right text-gray-400">Social Medias</div>
					<div class="col-span-3 whitespace-pre-line">
						{#if data.socialMedias.length === 0}
							-
						{:else}
							<div class="grid grid-cols-1">
								{#each data.socialMedias as sm}
									<div>
										<a
											class="hover:text-yellow-500 underline"
											href={sm}
											target="_blank"
											rel="noreferrer">{getHostname(sm)}</a
										>
									</div>
								{/each}
							</div>
						{/if}
					</div>
					<div class="col-span-2 text-right text-gray-400">Official Websites</div>
					<div class="col-span-3 whitespace-pre-line">
						{#if data.officialWebsites.length === 0}
							-
						{:else}
							<div class="grid grid-cols-1">
								{#each data.officialWebsites as sm}
									<div>
										<a
											class="hover:text-yellow-500 underline"
											href={sm}
											target="_blank"
											rel="noreferrer">{getHostname(sm)}</a
										>
									</div>
								{/each}
							</div>
						{/if}
					</div>
					<div class="col-span-2 text-right text-gray-400">Gender</div>
					<div class="col-span-3">{data.gender}</div>
					<div class="col-span-2 text-right text-gray-400">Age</div>
					<div class="col-span-3">{data.age || '-'}</div>
					<div class="col-span-2 text-right text-gray-400">Birthday</div>
					<div class="col-span-3">{formatBirthday(data.birthday)}</div>
					<div class="col-span-2 text-right text-gray-400">Height (cm)</div>
					<div class="col-span-3">{data.height || '-'}</div>
					<div class="col-span-2 text-right text-gray-400">Weight (kg)</div>
					<div class="col-span-3">{data.weight || '-'}</div>
					<div class="col-span-2 text-right text-gray-400">Blood Type</div>
					<div class="col-span-3">{data.bloodType}</div>
					<div class="col-span-2 text-right text-gray-400">Zodiac Sign</div>
					<div class="col-span-3">{data.zodiacSign}</div>
				</div>
			</div>
			<div
				class="flex justify-between items-center px-3 py-1 bg-yellow-500 sticky bottom-0 text-white"
			>
				<div class="text-ellipsis whitespace-nowrap overflow-hidden" title="Quote">
					{data.caption}
				</div>
				<div class="flex">
					{#if data.has2d}
						<span
							class="bg-blue-500 text-white text-xs font-medium px-2.5 py-0.5 rounded-full ml-2"
							title="Has 2D model">2D</span
						>
					{/if}
					{#if data.has3d}
						<span
							class="bg-purple-500 text-white text-xs font-medium px-2.5 py-0.5 rounded-full ml-2"
							title="Has 3D model">3D</span
						>
					{/if}
					{#if data.retirementDate}
						<span
							class="bg-red-500 text-white text-xs font-medium px-2.5 py-0.5 rounded-full ml-2"
							title="Has retired">Retired</span
						>
					{/if}
				</div>
			</div>
		{/if}
	</div>
{/if}
