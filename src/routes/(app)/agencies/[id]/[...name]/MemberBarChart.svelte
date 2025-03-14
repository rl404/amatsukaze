<script lang="ts">
	import RenderIfVisible from '$lib/components/commons/RenderIfVisible.svelte';
	import type { VtuberSort } from '$lib/types';
	import { compactInt, getWikiImg, intToDurationStr, toURL, vtuberSorter } from '$lib/utils/utils';
	import { Avatar } from 'flowbite-svelte';
	import type { VtuberResponseData } from '../../../../api/vtubers/[id]/+server';

	export let vtubers: VtuberResponseData[];
	export let sort: VtuberSort;

	let maxValue: number = 0;

	$: sort, (maxValue = getMaxValue(sort));

	const getMaxValue = (sort: VtuberSort): number => {
		switch (sort) {
			case 'subscriber':
			case '-subscriber':
				return Math.max(...vtubers.map((v) => v.subscriber));
			case 'monthly_subscriber':
			case '-monthly_subscriber':
				return Math.max(...vtubers.map((v) => v.monthly_subscriber));
			case 'video_count':
			case '-video_count':
				return Math.max(...vtubers.map((v) => v.video_count));
			case 'average_video_length':
			case '-average_video_length':
				return Math.max(...vtubers.map((v) => v.average_video_length));
			case 'total_video_length':
			case '-total_video_length':
				return Math.max(...vtubers.map((v) => v.total_video_length));
			default:
				return 0;
		}
	};

	const getValue = (vtuber: VtuberResponseData, sort: VtuberSort): string => {
		switch (sort) {
			case 'subscriber':
			case '-subscriber':
				return compactInt(vtuber.subscriber);
			case 'monthly_subscriber':
			case '-monthly_subscriber':
				return compactInt(vtuber.monthly_subscriber);
			case 'video_count':
			case '-video_count':
				return compactInt(vtuber.video_count);
			case 'average_video_length':
			case '-average_video_length':
				return intToDurationStr(vtuber.average_video_length);
			case 'total_video_length':
			case '-total_video_length':
				return intToDurationStr(vtuber.total_video_length);
			default:
				return '';
		}
	};

	const getWidth = (vtuber: VtuberResponseData, sort: VtuberSort): string => {
		switch (sort) {
			case 'subscriber':
			case '-subscriber':
				return (vtuber.subscriber * 100) / maxValue + '%';
			case 'monthly_subscriber':
			case '-monthly_subscriber':
				return (vtuber.monthly_subscriber * 100) / maxValue + '%';
			case 'video_count':
			case '-video_count':
				return (vtuber.video_count * 100) / maxValue + '%';
			case 'average_video_length':
			case '-average_video_length':
				return (vtuber.average_video_length * 100) / maxValue + '%';
			case 'total_video_length':
			case '-total_video_length':
				return (vtuber.total_video_length * 100) / maxValue + '%';
			default:
				return '';
		}
	};
</script>

<div class="grid gap-2">
	{#each vtubers.sort(vtuberSorter(sort)) as vtuber}
		<RenderIfVisible class="flex h-7 gap-2">
			<Avatar
				src={getWikiImg(vtuber.image)}
				alt={vtuber.name}
				size="none"
				class="size-7 object-cover object-top"
				title={vtuber.name}
			/>
			<a
				href="/vtubers/{vtuber.id}/{toURL(vtuber.name)}"
				class="clickable h5 line-clamp-1 rounded-lg bg-primary-500 px-2 text-white"
				style="width:{getWidth(vtuber, sort)}"
				title={vtuber.name}
			>
				{vtuber.name}
			</a>
			<div class="flex w-20 items-center">{getValue(vtuber, sort)}</div>
		</RenderIfVisible>
	{/each}
</div>
