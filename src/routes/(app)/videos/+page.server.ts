import type { PageServerLoad } from './$types';

export type VideosPageResponse = {
	live: VideosPageResponseData;
	upcoming: VideosPageResponseData;
	recent: VideosPageResponseData;
};

export type VideosPageResponseData = {
	start: string;
	end: string;
	is_finished: boolean;
	sort: string;
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

	return {
		live: {
			start: liveStart.toISOString(),
			end: liveEnd.toISOString(),
			is_finished: false,
			sort: '-video_start_date'
		},
		upcoming: {
			start: upcomingStart.toISOString(),
			end: '',
			is_finished: false,
			sort: 'video_start_date'
		},
		recent: {
			start: '',
			end: recentEnd.toISOString(),
			is_finished: true,
			sort: '-video_start_date'
		}
	};
}) satisfies PageServerLoad;
