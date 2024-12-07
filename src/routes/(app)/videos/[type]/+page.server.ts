import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export type VideoPageResponse = {
	title: string;
	description: string;
	image: string;
	startDate: string;
	endDate: string;
	isFinished: boolean;
	sort: string;
};

export const config = {
	isr: {
		expiration: 60 * 30
	}
};

export const load = (({ params }) => {
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

	const pageData: { [type: string]: VideoPageResponse } = {
		live: {
			title: 'Live Streams',
			description:
				'Find who is live streaming right now. Watch your favorite vtuber or discover a new one.',
			image: '/live.png',
			startDate: liveStart.toISOString(),
			endDate: liveEnd.toISOString(),
			isFinished: false,
			sort: '-video_start_date'
		},
		upcoming: {
			title: 'Upcoming Streams',
			description: 'Find upcoming scheduled streams and videos and prepare yourself to watch them.',
			image: '/upcoming.png',
			startDate: upcomingStart.toISOString(),
			endDate: '',
			isFinished: false,
			sort: 'video_start_date'
		},
		recent: {
			title: 'Recent Streams & Videos',
			description:
				'Find recently finished streams and uploaded videos and watch your missed favorite vtuber streams and videos.',
			image: '/recent.png',
			startDate: '',
			endDate: recentEnd.toISOString(),
			isFinished: true,
			sort: '-video_start_date'
		}
	};

	const data = pageData[params.type];
	if (!data) return error(404, 'Not Found');
	return data;
}) satisfies PageServerLoad;
