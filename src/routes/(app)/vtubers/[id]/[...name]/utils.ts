import { DayNames } from '$lib/const';
import type { ChannelType } from '$lib/types';
import type {
	VtuberResponseData,
	VtuberResponseDataChannelVideo
} from '../../../../api/vtubers/[id]/+server';

export type VtuberVideo = VtuberResponseDataChannelVideo & { type: ChannelType };

export type VtuberVideoMonth = {
	month: number;
	year: number;
	days: VtuberVideoDay[];
};

export type VtuberVideoDay = {
	day: number;
	focus: boolean;
	videos: VtuberVideo[];
};

export const getMonthsData = (vtuber: VtuberResponseData): VtuberVideoMonth[] => {
	const today = new Date();

	let months: VtuberVideoMonth[] = [];

	const videos = vtuber.channels
		.reduce(
			(res, c) => [...res, ...c.videos.map((v) => ({ ...v, type: c.type }))],
			[] as VtuberVideo[]
		)
		.filter(
			(video) =>
				video.start_date &&
				new Date(video.start_date) <= new Date(today.getFullYear(), today.getMonth() + 1)
		)
		.sort((a, b) => {
			if (!a.start_date) return -1;
			if (!b.start_date) return 1;
			return a.start_date < b.start_date ? -1 : 1;
		});

	let startDate = new Date(videos[0].start_date || '');
	let endDate = new Date(videos[videos.length - 1].start_date || '');
	startDate = today < startDate ? today : startDate;
	endDate = today > endDate ? today : endDate;

	const startMonth = startDate.getMonth();
	const startYear = startDate.getFullYear();
	const endMonth = endDate.getMonth();
	const endYear = endDate.getFullYear();

	for (
		let [m, y] = [startMonth, startYear];
		m <= endMonth + 12 * (endYear - startYear) && y <= endYear;
		[m, y] = [m + 1, startYear + Math.floor(m / 11)]
	) {
		const day1 = new Date(y, m % 12, 1).getDay();
		const lastDate = new Date(y, (m + 1) % 12, 0).getDate();
		const lastDay = new Date(y, m % 12, lastDate).getDay();
		const lastDateLastMonth = new Date(y, m % 12, 0).getDate();

		let days: VtuberVideoDay[] = [];

		for (let i = day1; i > 0; i--) {
			days = [
				...days,
				{
					day: lastDateLastMonth - i + 1,
					focus: false,
					videos: []
				}
			];
		}

		for (let i = 1; i <= lastDate; i++) {
			days = [
				...days,
				{
					day: i,
					focus: true,
					videos: videos.filter((v) => {
						if (!v.start_date) return false;
						const date = new Date(v.start_date);
						return date.getFullYear() === y && date.getMonth() === m % 12 && date.getDate() === i;
					})
				}
			];
		}

		for (let i = lastDay; i < 6; i++) {
			days = [
				...days,
				{
					day: i - lastDay + 1,
					focus: false,
					videos: []
				}
			];
		}

		months = [
			...months,
			{
				month: m - 12 * (y - startYear),
				year: y,
				days: days
			}
		];
	}

	return months;
};

export type VtuberHeatmap = {
	day: string;
	value: number[];
};

export const getHeatmapData = (vtuber: VtuberResponseData): VtuberHeatmap[] => {
	const days: { [day: string]: number[] } = DayNames.reduce(
		(res, d) => ({ ...res, [d]: Array(24).fill(0) }),
		{}
	);

	vtuber.channels.forEach((ch) => {
		ch.videos.forEach((v) => {
			if (!v.start_date) return;
			const startDate = new Date(v.start_date);
			const day = startDate.getDay();
			const startHour = startDate.getHours();
			days[DayNames[day]][startHour]++;
		});
	});

	return Object.entries(days).map((d) => ({
		day: d[0],
		value: d[1]
	}));
};
