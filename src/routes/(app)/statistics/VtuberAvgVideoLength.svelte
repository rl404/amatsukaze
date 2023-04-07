<script lang="ts">
	import { intToDurationStr } from '$lib/utils';
	import type { vtuberResponseData, vtuberResponseDataChannelVideo } from '../../api/vtubers/[id]/+server';

	export let data: Array<vtuberResponseData>;

	const avgLength = data
		.reduce(
			(res, vtuber) => [...res, ...vtuber.channels.reduce((res2, c) => [...res2, ...c.videos], [] as Array<vtuberResponseDataChannelVideo>)],
			[] as Array<vtuberResponseDataChannelVideo>
		)
		.filter((v) => v.start_date && v.end_date)
		.reduce(
			(avg, v, _, { length }) =>
				!v.start_date || !v.end_date ? avg : avg + (new Date(v.end_date).getTime() - new Date(v.start_date).getTime()) / length,
			0
		);
</script>

<div class="text-center font-bold text-5xl">{intToDurationStr(avgLength)}</div>
