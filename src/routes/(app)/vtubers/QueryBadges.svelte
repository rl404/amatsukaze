<script lang="ts">
	import TagsIcon from '$lib/components/icons/TagsIcon.svelte';
	import XMarkIcon from '$lib/components/icons/XMarkIcon.svelte';
	import { MonthNames } from '$lib/const';
	import type { VtubersQuery } from '$lib/types';
	import { compactInt, toTitleCase } from '$lib/utils/utils';
	import { Badge } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';
	import type { LanguageResponseData } from '../../api/languages/+server';

	const dispatch = createEventDispatcher<{ change: null }>();

	export let query: VtubersQuery;
	export let languages: LanguageResponseData[];

	const onClose = (name: keyof VtubersQuery, value: any, callDispatch = true) => {
		query = { ...query, [name]: value };
		callDispatch && dispatch('change');
	};

	const onCloseChannel = (i: number) => {
		query = {
			...query,
			channel_types: query.channel_types
				.split(',')
				.filter((_, j) => j !== i)
				.join(',')
		};
		dispatch('change');
	};

	const channelToStr = (channel: string): string => {
		switch (channel) {
			case 'YOUTUBE':
			case 'TWITCH':
			case 'BILIBILI':
			case 'NICONICO':
				return 'Has ' + toTitleCase(channel);
			case '-YOUTUBE':
			case '-TWITCH':
			case '-BILIBILI':
			case '-NICONICO':
				return 'No ' + toTitleCase(channel.slice(1));
			case 'OTHER':
				return 'Has Other Channel';
			case '-OTHER':
				return 'No Other Channel';
			default:
				return '';
		}
	};
</script>

<div class="flex flex-wrap items-center gap-2">
	<TagsIcon class="size-4" />
	{#if query.names !== ''}
		<Badge dismissable on:close={() => onClose('names', '')}>
			Search: {query.names}
		</Badge>
	{/if}
	{#if query.name !== ''}
		<Badge dismissable on:close={() => onClose('name', '')}>
			Name: {query.name}
		</Badge>
	{/if}
	{#if query.original_name !== ''}
		<Badge dismissable on:close={() => onClose('original_name', '')}>
			Original Name: {query.original_name}
		</Badge>
	{/if}
	{#if query.nickname !== ''}
		<Badge dismissable on:close={() => onClose('nickname', '')}>
			Nickname: {query.nickname}
		</Badge>
	{/if}
	{#if !query.exclude_active}
		<Badge dismissable on:close={() => onClose('exclude_active', true)}>Active</Badge>
	{/if}
	{#if !query.exclude_retired}
		<Badge dismissable on:close={() => onClose('exclude_retired', true)}>Retired</Badge>
	{/if}
	{#if query.start_debut_year != '' || query.end_debut_year != ''}
		<Badge
			dismissable
			on:close={() => (onClose('start_debut_year', '', false), onClose('end_debut_year', ''))}
		>
			Debut: {query.start_debut_year || '0'} - {query.end_debut_year || new Date().getFullYear()}
		</Badge>
	{/if}
	{#if query.start_retired_year != '' || query.end_retired_year != ''}
		<Badge
			dismissable
			on:close={() => (onClose('start_retired_year', '', false), onClose('end_retired_year', ''))}
		>
			Retired: {query.start_retired_year || '0'} - {query.end_retired_year ||
				new Date().getFullYear()}
		</Badge>
	{/if}
	{#if query.has_2d === true}
		<Badge dismissable on:close={() => onClose('has_2d', undefined)}>Has 2D model</Badge>
	{/if}
	{#if query.has_2d === false}
		<Badge dismissable on:close={() => onClose('has_2d', undefined)}>No 2D model</Badge>
	{/if}
	{#if query.has_3d === true}
		<Badge dismissable on:close={() => onClose('has_3d', undefined)}>Has 3D model</Badge>
	{/if}
	{#if query.has_3d === false}
		<Badge dismissable on:close={() => onClose('has_3d', undefined)}>No 3D model</Badge>
	{/if}
	{#if query.character_designer !== ''}
		<Badge dismissable on:close={() => onClose('character_designer', '')}>
			Designer: {query.character_designer}
		</Badge>
	{/if}
	{#if query.character_2d_modeler !== ''}
		<Badge dismissable on:close={() => onClose('character_2d_modeler', '')}>
			2D Modeler: {query.character_2d_modeler}
		</Badge>
	{/if}
	{#if query.character_3d_modeler !== ''}
		<Badge dismissable on:close={() => onClose('character_3d_modeler', '')}>
			3D Modeler: {query.character_3d_modeler}
		</Badge>
	{/if}
	{#if query.in_agency === true}
		<Badge dismissable on:close={() => onClose('in_agency', undefined)}>In Agency</Badge>
	{/if}
	{#if query.in_agency === false}
		<Badge dismissable on:close={() => onClose('in_agency', undefined)}>Independent</Badge>
	{/if}
	{#if query.channel_types !== ''}
		{#each query.channel_types.split(',') as channel, i}
			<Badge dismissable>
				{channelToStr(channel)}
				<button
					slot="close-button"
					class="text-primary-500 dark:hover:text-primary-300 m-0.5 -me-1.5 ms-1.5 whitespace-normal rounded-sm p-0.5 hover:bg-primary-200 focus:outline-none focus:ring-1 focus:ring-primary-400 dark:hover:bg-primary-800"
					on:click={() => onCloseChannel(i)}
				>
					<XMarkIcon class="size-3" />
				</button>
			</Badge>
		{/each}
	{/if}
	{#if query.birthday_day !== '' || query.start_birthday_month !== ''}
		<Badge
			dismissable
			on:close={() => (
				onClose('birthday_day', '', false),
				onClose('start_birthday_month', '', false),
				onClose('end_birthday_month', '')
			)}
		>
			Birthday: {query.birthday_day}
			{MonthNames[parseInt(query.start_birthday_month) - 1]}
		</Badge>
	{/if}
	{#if query.language_id !== ''}
		<Badge dismissable on:close={() => onClose('language_id', '')}>
			Language: {languages.find((l) => l.id.toString() === query.language_id)?.name}
		</Badge>
	{/if}
	{#if query.blood_types !== ''}
		<Badge dismissable on:close={() => onClose('blood_types', '')}>
			Blood: {query.blood_types}
		</Badge>
	{/if}
	{#if query.genders !== ''}
		<Badge dismissable on:close={() => onClose('genders', '')}>
			Gender: {query.genders}
		</Badge>
	{/if}
	{#if query.zodiacs !== ''}
		<Badge dismissable on:close={() => onClose('zodiacs', '')}>
			Zodiac: {query.zodiacs}
		</Badge>
	{/if}
	{#if query.start_subscriber != '' || query.end_subscriber != ''}
		<Badge
			dismissable
			on:close={() => (onClose('start_subscriber', '', false), onClose('end_subscriber', ''))}
		>
			Subscriber: {query.start_subscriber ? compactInt(parseInt(query.start_subscriber)) : '0'} - {query.end_subscriber
				? compactInt(parseInt(query.end_subscriber))
				: '0'}
		</Badge>
	{/if}
	{#if query.start_video_count != '' || query.end_video_count != ''}
		<Badge
			dismissable
			on:close={() => (onClose('start_video_count', '', false), onClose('end_video_count', ''))}
		>
			Video: {query.start_video_count || '0'} - {query.end_video_count || '0'}
		</Badge>
	{/if}
</div>
