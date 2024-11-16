import { ChannelTypes, MonthNames } from '$lib/const';
import type { AgencySort, VtuberSort } from '$lib/types';
import type { AgencyResponseData } from '../../routes/api/agencies/[id]/+server';
import type {
	VtuberResponseData,
	VtuberResponseDataChannel
} from '../../routes/api/vtubers/[id]/+server';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const shuffleArray = (array: any[]) => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
};

export const getWikiImg = (src: string, height = 206, width = 0): string => {
	return src && `/api/images/wikia/${src.split('?')[0]}?height=${height}&width=${width}`;
};

export const toTitleCase = (str: string): string => {
	return str.replace(/\w\S*/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();
	});
};

const si = [
	{ v: 1e3, s: 'K' },
	{ v: 1e6, s: 'M' },
	{ v: 1e9, s: 'B' },
	{ v: 1e12, s: 'T' },
	{ v: 1e15, s: 'P' },
	{ v: 1e18, s: 'E' }
];

export const compactInt = (n: number) => {
	const num = n.toString().replace(/[^0-9.]/g, '');
	if (n < 1000) {
		return num;
	}

	let index;
	for (index = si.length - 1; index > 0; index--) {
		if (n >= si[index].v) {
			break;
		}
	}
	return (n / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[index].s;
};

export const generateVtuberDescription = (vtuber: VtuberResponseData): string => {
	let desc = vtuber.caption ? vtuber.caption + '. ' : '';
	desc += `Meet ${vtuber.name}`;
	desc +=
		vtuber.agencies.length === 0
			? ', an independent vtuber, '
			: ` from ${vtuber.agencies.map((a) => a.name).join(', ')} agency `;
	desc += `who entertained fans since ${
		!vtuber.debut_date ? 'unknown' : vtuber.debut_date.slice(0, 10)
	}`;
	desc += vtuber.retirement_date && ` to ${vtuber.retirement_date.slice(0, 10)}`;
	desc +=
		'. Discover their unique details, designer, modeler, agency mates, families, and channel videos.';
	return desc;
};

export const generateAgencyDescription = (agency: AgencyResponseData): string => {
	return `Explore ${
		agency.name
	} agency housing ${agency.member.toLocaleString()} incredible talents cherished by ${compactInt(
		agency.subscriber
	)} fans. Discover their monthly member count insights and debut-to-retirement timelines for each member, unraveling the agency's journey in the virtual universe.`;
};

export const isEmptyArray = (arr: any[]): boolean => {
	if (!arr) return true;
	return arr.length === 0;
};

export const channelSorter = (
	a: VtuberResponseDataChannel,
	b: VtuberResponseDataChannel
): number => {
	const ia = ChannelTypes.findIndex((c) => c === a.type);
	const ib = ChannelTypes.findIndex((c) => c === b.type);
	return ia - ib;
};

export const getHostname = (url: string): string => {
	return new URL(url).hostname.replace('www.', '');
};

export const formatBirthday = (d: string | undefined): string => {
	if (!d || !new Date(d)) return '-';

	const dd = new Date(d);
	const day = dd.getDate();
	const month = MonthNames[dd.getMonth()];

	return month + ' ' + day;
};

export const vtuberSorter =
	(sort: VtuberSort) =>
	(a: VtuberResponseData, b: VtuberResponseData): number => {
		switch (sort) {
			case 'name':
				return a.name < b.name ? -1 : 1;
			case '-name':
				return a.name > b.name ? -1 : 1;
			case 'debut_date':
				if (!a.debut_date || !new Date(a.debut_date)) return 1;
				if (!b.debut_date || !new Date(b.debut_date)) return -1;
				return new Date(a.debut_date) < new Date(b.debut_date) ? -1 : 1;
			case '-debut_date':
				if (!a.debut_date || !new Date(a.debut_date)) return 1;
				if (!b.debut_date || !new Date(b.debut_date)) return -1;
				return new Date(a.debut_date) > new Date(b.debut_date) ? -1 : 1;
			case 'retirement_date':
				if (!a.retirement_date || !new Date(a.retirement_date)) return 1;
				if (!b.retirement_date || !new Date(b.retirement_date)) return -1;
				return new Date(a.retirement_date) < new Date(b.retirement_date) ? -1 : 1;
			case '-retirement_date':
				if (!a.retirement_date || !new Date(a.retirement_date)) return 1;
				if (!b.retirement_date || !new Date(b.retirement_date)) return -1;
				return new Date(a.retirement_date) > new Date(b.retirement_date) ? -1 : 1;
			case 'subscriber':
				return a.subscriber < b.subscriber ? -1 : 1;
			case '-subscriber':
				return a.subscriber > b.subscriber ? -1 : 1;
			case 'monthly_subscriber':
				return a.monthly_subscriber < b.monthly_subscriber ? -1 : 1;
			case '-monthly_subscriber':
				return a.monthly_subscriber > b.monthly_subscriber ? -1 : 1;
			case 'video_count':
				if (a.retirement_date) return -1;
				if (b.retirement_date) return 1;
				return a.video_count < b.video_count ? -1 : 1;
			case '-video_count':
				if (a.retirement_date) return 1;
				if (b.retirement_date) return -1;
				return a.video_count > b.video_count ? -1 : 1;
			default:
				return a.name < b.name ? -1 : 1;
		}
	};

export const agencySorter =
	(sort: AgencySort) =>
	(a: AgencyResponseData, b: AgencyResponseData): number => {
		switch (sort) {
			case 'name':
				return a.name < b.name ? -1 : 1;
			case '-name':
				return a.name > b.name ? -1 : 1;
			case 'member':
				return a.member < b.member ? -1 : 1;
			case '-member':
				return a.member > b.member ? -1 : 1;
			case 'subscriber':
				return a.subscriber < b.subscriber ? -1 : 1;
			case '-subscriber':
				return a.subscriber > b.subscriber ? -1 : 1;
			default:
				return a.name < b.name ? -1 : 1;
		}
	};

export const intToDurationStr = (dur: number): string => {
	const hours = Math.floor(dur / 3600);
	const minutes = Math.floor((dur - hours * 3600) / 60);
	const seconds = dur - hours * 3600 - minutes * 60;

	let hourStr = hours.toFixed();
	let minuteStr = minutes.toFixed();
	let secondStr = seconds.toFixed();

	if (hours < 10) hourStr = '0' + hourStr;
	if (minutes < 10) minuteStr = '0' + minuteStr;
	if (seconds < 10) secondStr = '0' + secondStr;

	return hourStr + ':' + minuteStr + ':' + secondStr;
};

export const relativeTime = (d: Date): string => {
	const now = new Date().getTime();
	let diff = (now - d.getTime()) / 1000;

	let prefix = '';
	let suffix = ' ago';

	if (diff < 0) {
		diff *= -1;
		prefix = 'in ';
		suffix = '';
	}

	if (diff < 60) {
		return `${prefix}${diff} seconds${suffix}`;
	} else if (diff < 3600) {
		return `${prefix}${Math.floor(diff / 60)} minutes${suffix}`;
	} else if (diff < 86400) {
		return `${prefix}${Math.floor(diff / 3600)} hours${suffix}`;
	} else if (diff < 2620800) {
		return `${prefix}${Math.floor(diff / 86400)} days${suffix}`;
	} else if (diff < 31449600) {
		return `${prefix}${Math.floor(diff / 2620800)} months${suffix}`;
	} else {
		return `${prefix}${Math.floor(diff / 31449600)} years${suffix}`;
	}
};

export const autoCeil = (i: number): number => {
	if (i < 0) i *= -1;
	const str = i.toString();
	const div = 10 ** (str.length - 1);
	return Math.ceil(i / div) * div;
};

export const toURL = (str: string): string => {
	return str.replaceAll(' ', '-');
};

export const toNumber = (str: string): number => {
	const n = Number(str);
	return isNaN(n) ? 0 : n;
};

export const mustArrayLen = (arr: any, length: number, fill: any): any[] => {
	return arr.concat(new Array(length).fill(fill)).slice(0, length);
};
