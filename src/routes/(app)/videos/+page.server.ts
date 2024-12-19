import { SHIMAKAZE_HOST } from '$env/static/private';
import { handleAPIResponse } from '$lib/utils/api';
import type { VideosResponse } from '../../api/videos/+server';
import type { PageServerLoad } from './$types';

export type StreamsResponse = {
	live: VideosResponse;
	upcoming: VideosResponse;
	recent: VideosResponse;
};

export const config = {
	isr: {
		expiration: 60 * 5
	}
};

export const load = (async () => {
	const liveStart = new Date();
	liveStart.setHours(liveStart.getHours() - 3);
	liveStart.setMinutes(0);
	liveStart.setSeconds(0);
	liveStart.setMilliseconds(0);

	const liveEnd = new Date();
	liveEnd.setMinutes(liveEnd.getMinutes() > 30 ? 30 : 0);
	liveEnd.setSeconds(0);
	liveEnd.setMilliseconds(0);

	const upcomingStart = new Date();
	upcomingStart.setHours(
		upcomingStart.getMinutes() > 30 ? upcomingStart.getHours() + 1 : upcomingStart.getHours()
	);
	upcomingStart.setMinutes(upcomingStart.getMinutes() > 30 ? 0 : 30);
	upcomingStart.setSeconds(0);
	upcomingStart.setMilliseconds(0);

	const recentEnd = new Date();
	recentEnd.setMinutes(recentEnd.getMinutes() > 30 ? 30 : 0);
	recentEnd.setSeconds(0);
	recentEnd.setMilliseconds(0);

	const [liveResp, upcomingResp, recentResp] = await Promise.all([
		await fetch(
			`${SHIMAKAZE_HOST}/videos?start_date=${liveStart.toISOString()}&end_date=${liveEnd.toISOString()}&is_finished=false&sort=-video_start_date&limit=12`
		),
		await fetch(
			`${SHIMAKAZE_HOST}/videos?start_date=${upcomingStart.toISOString()}&is_finished=false&sort=video_start_date&limit=12`
		),
		await fetch(
			`${SHIMAKAZE_HOST}/videos?end_date=${recentEnd.toISOString()}&is_finished=true&sort=-video_start_date&limit=12`
		)
	]);
	return {
		live: await handleAPIResponse(liveResp),
		upcoming: await handleAPIResponse(upcomingResp),
		recent: await handleAPIResponse(recentResp)
	};
}) satisfies PageServerLoad;
