import { MonthNames } from '$lib/const';
import type { VtuberResponseData } from '../../api/vtubers/[id]/+server';

export type EventMonth = {
	id: string;
	date: string;
	birthday: VtuberResponseData[];
	anniversary: VtuberResponseData[];
};

export const getTimelineData = (
	month: number,
	birthdayData: VtuberResponseData[],
	anniversaryData: VtuberResponseData[]
): EventMonth[] => {
	let timelineData: { [data: string]: EventMonth } = {};

	const today = new Date();
	const lastDate = new Date(today.getFullYear(), month, 0).getDate();

	for (let day = 1; day <= lastDate; day++) {
		const date = `${today.getFullYear()}-${('0' + month).slice(-2)}-${('0' + day).slice(-2)}`;
		timelineData = {
			...timelineData,
			[date]: {
				id: date,
				date: date,
				birthday: [],
				anniversary: []
			}
		};
	}

	birthdayData.forEach((vtuber) => {
		if (!vtuber.birthday) return;
		const date = new Date(vtuber.birthday).toISOString();
		const key = `${today.getFullYear()}-${date.slice(5, 10)}`;
		timelineData[key].birthday.push(vtuber);
	});

	anniversaryData.forEach((vtuber) => {
		if (!vtuber.debut_date) return;
		const date = new Date(vtuber.debut_date).toISOString();
		const key = `${today.getFullYear()}-${date.slice(5, 10)}`;
		timelineData[key].anniversary.push(vtuber);
	});

	return Object.values(timelineData).map((v) => {
		const d = new Date(v.date);
		v.date = `${('0' + d.getDate()).slice(-2)} ${MonthNames[d.getMonth()]} ${today.getFullYear()}`;
		return v;
	});
};
