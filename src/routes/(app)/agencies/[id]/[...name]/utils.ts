import { MonthNames } from '$lib/const';
import type { VtuberResponseData } from '../../../../api/vtubers/[id]/+server';

export type AgencyMemberMonth = {
	date: string;
	debut: number;
	retired: number;
	total: number;
};

export const getChartData = (vtubers: VtuberResponseData[]): AgencyMemberMonth[] => {
	const chartData: { [date: string]: AgencyMemberMonth } = {};
	let minDate: Date = new Date();
	let maxDate: Date = new Date();

	vtubers.forEach((vtuber) => {
		if (vtuber.debut_date && new Date(vtuber.debut_date)) {
			const debutDate = new Date(vtuber.debut_date);
			if (debutDate.getFullYear() === 0) return;
			if (debutDate < minDate) minDate = debutDate;
			if (debutDate > maxDate) maxDate = debutDate;
		}

		if (vtuber.retirement_date && new Date(vtuber.retirement_date)) {
			const retiredDate = new Date(vtuber.retirement_date);
			if (retiredDate.getFullYear() === 0) return;
			if (retiredDate < minDate) minDate = retiredDate;
			if (retiredDate > maxDate) maxDate = retiredDate;
		}
	});

	minDate.setMonth(minDate.getMonth() - 1);
	maxDate.setMonth(maxDate.getMonth() + 1);

	while (minDate.toISOString().slice(0, 7) != maxDate.toISOString().slice(0, 7)) {
		const key = `${minDate.toISOString().slice(0, 7)}-01`;
		chartData[key] = { date: key, debut: 0, retired: 0, total: 0 };
		minDate.setMonth(minDate.getMonth() + 1);
	}

	vtubers.forEach((vtuber) => {
		if (vtuber.debut_date && new Date(vtuber.debut_date)) {
			const debutDate = new Date(vtuber.debut_date);
			if (debutDate.getFullYear() === 0) return;
			const key = `${debutDate.toISOString().slice(0, 7)}-01`;
			chartData[key].debut++;
			chartData[key].total++;
		}

		if (vtuber.retirement_date && new Date(vtuber.retirement_date)) {
			const retiredDate = new Date(vtuber.retirement_date);
			if (retiredDate.getFullYear() === 0) return;
			const key = `${retiredDate.toISOString().slice(0, 7)}-01`;
			chartData[key].retired++;
			chartData[key].total--;
		}
	});

	Object.entries(chartData).forEach((d, i) => {
		if (i === 0) return;
		const key = d[0];
		const prevKey = Object.entries(chartData)[i - 1][0];
		chartData[key].total += chartData[prevKey].total;
	});

	return Object.entries(chartData).map((d) => ({
		date: d[0],
		debut: d[1].debut,
		retired: d[1].retired,
		total: d[1].total
	}));
};

export type AgencyMemberTimeline = {
	id: string;
	date: string;
	debut: VtuberResponseData[];
	retired: VtuberResponseData[];
};

export const getTimelineData = (
	vtubers: VtuberResponseData[],
	asc = true
): AgencyMemberTimeline[] => {
	const timelineData: { [date: string]: AgencyMemberTimeline } = vtubers.reduce(
		(res, vtuber: VtuberResponseData) => {
			if (!vtuber.debut_date || !new Date(vtuber.debut_date)) {
				if (!res[-1]) res[-1] = { id: '', date: '', debut: [], retired: [] };
				res[-1].debut.push(vtuber);
			} else {
				const debutDate = new Date(vtuber.debut_date).toISOString();
				const yearMonth = `${debutDate.slice(0, 7)}-01`;
				if (!res[yearMonth])
					res[yearMonth] = { id: yearMonth, date: yearMonth, debut: [], retired: [] };
				res[yearMonth].debut.push(vtuber);
			}

			if (!vtuber.retirement_date) return res;

			if (!vtuber.retirement_date || !new Date(vtuber.retirement_date)) {
				if (!res[-1]) res[-1] = { id: '', date: '', debut: [], retired: [] };
				res[-1].retired.push(vtuber);
			} else {
				const retiredDate = new Date(vtuber.retirement_date).toISOString();
				const yearMonth = `${retiredDate.slice(0, 7)}-01`;
				if (!res[yearMonth])
					res[yearMonth] = { id: yearMonth, date: yearMonth, debut: [], retired: [] };
				res[yearMonth].retired.push(vtuber);
			}

			return res;
		},
		{} as { [date: string]: AgencyMemberTimeline }
	);

	return Object.values(timelineData)
		.sort((a, b) => {
			const da = new Date(a.date);
			const db = new Date(b.date);
			if (isNaN(da.getTime())) return 1;
			if (isNaN(db.getTime())) return -1;
			if (asc) return da < db ? -1 : 1;
			return da > db ? -1 : 1;
		})
		.map((v) => {
			const d = new Date(v.date);
			v.date = isNaN(d.getTime()) ? 'Unknown' : `${MonthNames[d.getMonth()]} ${d.getFullYear()}`;
			return v;
		});
};

export type AgencyEventMonth = {
	month: number;
	year: number;
	days: AgencyEventDay[];
};

export type AgencyEventDay = {
	day: number;
	focus: boolean;
	birthday: VtuberResponseData[];
	anniversary: VtuberResponseData[];
};

export const getMonthsData = (
	vtubers: VtuberResponseData[],
	showBirthday = true,
	showAnniversary = true
): AgencyEventMonth[] => {
	const today = new Date();
	const year = today.getFullYear();

	let months: AgencyEventMonth[] = [];

	for (let month = 0; month < 12; month++) {
		const day1 = new Date(year, month, 1).getDay();
		const lastDate = new Date(year, month + 1, 0).getDate();
		const lastDay = new Date(year, month, lastDate).getDay();
		const lastDateLastMonth = new Date(year, month, 0).getDate();

		let days: AgencyEventDay[] = [];

		for (let i = day1; i > 0; i--) {
			days = [
				...days,
				{
					day: lastDateLastMonth - i + 1,
					focus: false,
					birthday: [],
					anniversary: []
				}
			];
		}

		for (let i = 1; i <= lastDate; i++) {
			days = [
				...days,
				{
					day: i,
					focus: true,
					birthday: vtubers.filter((vtuber) => {
						if (!showBirthday || !vtuber.birthday || vtuber.retirement_date) return false;
						const date = new Date(vtuber.birthday).toISOString();
						const key = `${today.getFullYear()}-${date.slice(5, 10)}`;
						const curr = new Date(Date.UTC(year, month, i)).toISOString().slice(0, 10);
						return key === curr;
					}),
					anniversary: vtubers.filter((vtuber) => {
						if (!showAnniversary || !vtuber.debut_date || vtuber.retirement_date) return false;
						const date = new Date(vtuber.debut_date).toISOString();
						const key = `${today.getFullYear()}-${date.slice(5, 10)}`;
						const curr = new Date(Date.UTC(year, month, i)).toISOString().slice(0, 10);
						return key === curr;
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
					birthday: [],
					anniversary: []
				}
			];
		}

		months = [
			...months,
			{
				month: month,
				year: year,
				days: days
			}
		];
	}

	return months;
};
