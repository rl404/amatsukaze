import type { vtuberResponseData, vtuberResponseDataChannel } from '../../routes/api/vtubers/[id]/+server';
import type { AxiosError } from 'axios';
import axios from 'axios';
import type { agencyResponseData } from '../../routes/api/agencies/[id]/+server';
import { theme } from './store';

export enum ThemeMode {
	Light = 'light',
	Dark = 'dark'
}

export const setTheme = (mode?: ThemeMode) => {
	if (!mode) {
		mode = getTheme();
	}

	localStorage.theme = mode;
	if (mode === ThemeMode.Dark) {
		document.documentElement.classList.add('dark');
	} else {
		document.documentElement.classList.remove('dark');
	}

	theme.set(mode);
};

export const getTheme = (): ThemeMode => {
	let mode = ThemeMode.Light;
	if (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		mode = ThemeMode.Dark;
	}

	if ('theme' in localStorage) {
		mode = localStorage.theme;
	}

	return mode;
};

export const getAxiosError = (error: Error | AxiosError): string => {
	if (!axios.isAxiosError(error) || !error.response || !error.response.data || !error.response.data.message) {
		return error.message;
	}
	return error.response.data.message;
};

export const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const formatBirthday = (d: Date | undefined): string => {
	if (!d || !new Date(d)) return '-';

	const dd = new Date(d);
	const day = dd.getDate();
	const month = monthNames[dd.getMonth()];

	return month + ' ' + day;
};

export const getHostname = (url: string): string => {
	return new URL(url).hostname.replace('www.', '');
};

export const isEmptyArray = (arr: Array<any>): boolean => {
	if (!arr) return true;
	return arr.length === 0;
};

export const getRandomInt = (min: number = 0, max: number = 10): number => {
	return Math.floor(Math.random() * (max - min)) + min;
};

export const channelTypes = ['YOUTUBE', 'TWITCH', 'BILIBILI', 'NICONICO', 'OTHER'];

export const channelSorter = (a: vtuberResponseDataChannel, b: vtuberResponseDataChannel): number => {
	const ia = channelTypes.findIndex((c) => c === a.type);
	const ib = channelTypes.findIndex((c) => c === b.type);
	return ia - ib;
};

export const toTitleCase = (str: string): string => {
	return str.replace(/\w\S*/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();
	});
};

export const resetObject = (fields: any): any => {
	return Object.keys(fields).reduce((acc: any, curr: any) => {
		if (fields[curr] === null) return { ...acc, [curr]: null };
		if (typeof fields[curr] === 'undefined') return { ...acc, [curr]: undefined };
		if (typeof fields[curr] === 'boolean') return { ...acc, [curr]: false };
		if (typeof fields[curr] === 'string') return { ...acc, [curr]: '' };
		if (typeof fields[curr] === 'number') return { ...acc, [curr]: 0 };
		if (fields[curr] instanceof Array) return { ...acc, [curr]: [] };
		if (typeof fields[curr] === 'object') return { ...acc, [curr]: {} };
	}, {});
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

export const vtuberSorter =
	(sort: string) =>
	(a: vtuberResponseData, b: vtuberResponseData): number => {
		switch (sort) {
			case 'name':
				return a.name < b.name ? -1 : 1;
			case '-name':
				return a.name > b.name ? -1 : 1;
			case 'debut_date':
				if (!a.debut_date || !new Date(a.debut_date)) return 1;
				if (!b.debut_date || !new Date(b.debut_date)) return -1;
				const da1 = new Date(a.debut_date);
				const db1 = new Date(b.debut_date);
				return da1 < db1 ? -1 : 1;
			case '-debut_date':
				if (!a.debut_date || !new Date(a.debut_date)) return 1;
				if (!b.debut_date || !new Date(b.debut_date)) return -1;
				const da2 = new Date(a.debut_date);
				const db2 = new Date(b.debut_date);
				return da2 > db2 ? -1 : 1;
			case 'retirement_date':
				if (!a.retirement_date || !new Date(a.retirement_date)) return 1;
				if (!b.retirement_date || !new Date(b.retirement_date)) return -1;
				const da3 = new Date(a.retirement_date);
				const db3 = new Date(b.retirement_date);
				return da3 < db3 ? -1 : 1;
			case '-retirement_date':
				if (!a.retirement_date || !new Date(a.retirement_date)) return 1;
				if (!b.retirement_date || !new Date(b.retirement_date)) return -1;
				const da4 = new Date(a.retirement_date);
				const db4 = new Date(b.retirement_date);
				return da4 > db4 ? -1 : 1;
			default:
				return a.name < b.name ? -1 : 1;
		}
	};

export const agencySorter =
	(sort: string) =>
	(a: agencyResponseData, b: agencyResponseData): number => {
		switch (sort) {
			case 'name':
				return a.name < b.name ? -1 : 1;
			case '-name':
				return a.name > b.name ? -1 : 1;
			default:
				return a.name < b.name ? -1 : 1;
		}
	};

const screenSize: { [size: string]: number } = {
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
	'2xl': 1536
};

export const isScreen = (size: string): boolean => {
	return window.innerWidth >= screenSize[size];
};
