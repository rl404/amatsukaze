/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	defaultVtubersQuery,
	type AgencySort,
	type VtuberSort,
	type VtubersQuery
} from '$lib/types';
import type { AgencyResponseData } from '../../routes/api/agencies/[id]/+server';
import type {
	VtuberResponseData,
	VtuberResponseDataChannel
} from '../../routes/api/vtubers/[id]/+server';
import { ChannelTypes, MonthNames } from './const';

export const shuffleArray = (array: any[]) => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
};

export const getWikiImg = (src: string): string => {
	return src && `/api/wikia/image/${src.split('?')[0]}?height=206`;
};

const dec2hex = (dec: number): string => {
	return dec.toString(16).padStart(2, '0');
};

export const generateRandomStr = (len: number): string => {
	const arr = new Uint8Array((len || 40) / 2);
	window.crypto.getRandomValues(arr);
	return Array.from(arr, dec2hex).join('');
};

export const generateVtuberDescription = (vtuber: VtuberResponseData): string => {
	let desc = '';
	desc += `Agency: ${
		vtuber.agencies.length === 0 ? 'independent' : vtuber.agencies.map((a) => a.name).join(', ')
	}. `;
	desc += `Debut date: ${!vtuber.debut_date ? 'unknown' : vtuber.debut_date.slice(0, 10)}.`;
	vtuber.retirement_date && (desc += ` Retirement date: ${vtuber.retirement_date.slice(0, 10)}.`);
	return desc;
};

export const clickAway = (el: any): any => {
	const handleClick = (e: MouseEvent) => {
		if (el && !el.contains(e.target) && !e.defaultPrevented) {
			el.dispatchEvent(new CustomEvent('clickAway', el));
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
};

export const isEmptyArray = (arr: any[]): boolean => {
	if (!arr) return true;
	return arr.length === 0;
};

export const formatBirthday = (d: string | undefined): string => {
	if (!d || !new Date(d)) return '-';

	const dd = new Date(d);
	const day = dd.getDate();
	const month = MonthNames[dd.getMonth()];

	return month + ' ' + day;
};

export const channelSorter = (
	a: VtuberResponseDataChannel,
	b: VtuberResponseDataChannel
): number => {
	const ia = ChannelTypes.findIndex((c) => c === a.type);
	const ib = ChannelTypes.findIndex((c) => c === b.type);
	return ia - ib;
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

export const getHostname = (url: string): string => {
	return new URL(url).hostname.replace('www.', '');
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
			case 'subscriber': {
				const sa1 = a.channels.reduce((max, c) => (max > c.subscriber ? max : c.subscriber), 0);
				const sa2 = b.channels.reduce((max, c) => (max > c.subscriber ? max : c.subscriber), 0);
				return sa1 < sa2 ? -1 : 1;
			}
			case '-subscriber': {
				const sb1 = a.channels.reduce((max, c) => (max > c.subscriber ? max : c.subscriber), 0);
				const sb2 = b.channels.reduce((max, c) => (max > c.subscriber ? max : c.subscriber), 0);
				return sb1 > sb2 ? -1 : 1;
			}
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

export const intToDurationStr = (dur: number): string => {
	return new Date(dur).toISOString().slice(dur / 1000 >= 3600 ? 11 : 14, 19);
};

export const getVtubersQueryFromURLParam = (param: URLSearchParams): VtubersQuery => {
	return {
		names: param.get('names') || '',
		name: param.get('name') || '',
		original_name: param.get('original_name') || '',
		nickname: param.get('nickname') || '',
		exclude_active: param.get('exclude_active') === 'true',
		exclude_retired: param.get('exclude_retired') === 'true',
		start_debut_year: parseInt(param.get('start_debut_year') || '0'),
		end_debut_year: parseInt(param.get('end_debut_year') || '0'),
		start_retired_year: parseInt(param.get('start_retired_year') || '0'),
		end_retired_year: parseInt(param.get('end_retired_year') || '0'),
		has_2d: param.get('has_2d') === null ? undefined : param.get('has_2d') === 'true',
		has_3d: param.get('has_3d') === null ? undefined : param.get('has_3d') === 'true',
		character_designer: param.get('character_designer') || '',
		character_2d_modeler: param.get('character_2d_modeler') || '',
		character_3d_modeler: param.get('character_3d_modeler') || '',
		in_agency: param.get('in_agency') === null ? undefined : param.get('in_agency') === 'true',
		agency: param.get('agency') || '',
		channel_types: param.get('channel_types') || '',
		birthday_day: parseInt(param.get('birthday_day') || '0'),
		start_birthday_month: parseInt(param.get('start_birthday_month') || '0'),
		end_birthday_month: parseInt(param.get('end_birthday_month') || '0'),
		blood_types: param.get('blood_types') || '',
		genders: param.get('genders') || '',
		zodiacs: param.get('zodiacs') || '',
		start_subscriber: parseInt(param.get('start_subscriber') || '0'),
		end_subscriber: parseInt(param.get('end_subscriber') || '0'),
		page: parseInt(param.get('page') || defaultVtubersQuery.page.toString()),
		limit: parseInt(param.get('limit') || defaultVtubersQuery.limit.toString()),
		sort: (param.get('sort') || defaultVtubersQuery.sort) as VtuberSort
	};
};
