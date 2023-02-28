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
