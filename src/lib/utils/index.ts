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
