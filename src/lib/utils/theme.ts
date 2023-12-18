import { writable } from 'svelte/store';

export const theme = writable<ThemeMode>();

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
