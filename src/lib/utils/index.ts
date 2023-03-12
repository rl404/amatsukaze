import type { vtuberResponseDataChannel } from '../../routes/api/vtubers/[id]/+server';
import type { AxiosError } from 'axios';
import axios from 'axios';

export enum ThemeMode {
	Light = 'light',
	Dark = 'dark'
}

export const setTheme = (mode?: ThemeMode) => {
	if (!mode) {
		mode = ThemeMode.Light;
		if (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			mode = ThemeMode.Dark;
		}

		if ('theme' in localStorage) {
			mode = localStorage.theme;
		}
	}

	localStorage.theme = mode;
	if (localStorage.theme === ThemeMode.Dark) {
		document.documentElement.classList.add('dark');
	} else {
		document.documentElement.classList.remove('dark');
	}
};

export const getAxiosError = (error: Error | AxiosError): string => {
	if (!axios.isAxiosError(error) || !error.response || !error.response.data || !error.response.data.message) {
		return error.message;
	}
	return error.response.data.message;
};

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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
