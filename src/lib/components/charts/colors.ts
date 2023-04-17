import { ThemeMode } from '$lib/utils';

export const chartColors = {
	[ThemeMode.Dark]: [
		'#4f46e5',
		'#4f46e5e6',
		'#4f46e5cc',
		'#4f46e5b3',
		'#4f46e599',
		'#4f46e580',
		'#4f46e566',
		'#4f46e54d',
		'#4f46e533',
		'#4f46e51a',
		'#4f46e500'
	],
	[ThemeMode.Light]: [
		'#ec4899',
		'#ec4899e6',
		'#ec4899cc',
		'#ec4899b3',
		'#ec489999',
		'#ec489980',
		'#ec489966',
		'#ec48994d',
		'#ec489933',
		'#ec48991a',
		'#ec489900'
	],
	[ThemeMode.Dark + 2]: [
		'#4f46e5',
		'#7c3aed',
		'#9333ea',
		'#c026d3',
		'#db2777',
		'#e11d48',
		'#dc2626',
		'#ea580c',
		'#d97706',
		'#ca8a04',
		'#65a30d',
		'#16a34a',
		'#059669',
		'#0d9488',
		'#0891b2',
		'#0284c7',
		'#2563eb'
	],
	[ThemeMode.Light + 2]: [
		'#ec4899',
		'#f43f5e',
		'#ef4444',
		'#f97316',
		'#f59e0b',
		'#eab308',
		'#84cc16',
		'#22c55e',
		'#10b981',
		'#14b8a6',
		'#06b6d4',
		'#0ea5e9',
		'#3b82f6',
		'#6366f1',
		'#8b5cf6',
		'#a855f7',
		'#d946ef'
	],
	debut: ['#22c55e', '#4ade80'],
	retired: ['#ef4444', '#f87171']
};

export const chartTextColors = {
	[ThemeMode.Dark]: '#e5e5e5',
	[ThemeMode.Light]: '#404040'
};

export const chartBorderColors = {
	[ThemeMode.Dark]: '#525252',
	[ThemeMode.Light]: '#e5e7eb'
};

export const chartStrokeColors = {
	[ThemeMode.Dark]: '#171717',
	[ThemeMode.Light]: '#ffffff'
};

export const chartChannelColors: { [t: string]: { [type: string]: string } } = {
	[ThemeMode.Dark]: {
		YOUTUBE: '#ef4444',
		TWITCH: '#a855f7',
		BILIBILI: '#3b82f6',
		NICONICO: '#fff'
	},
	[ThemeMode.Light]: {
		YOUTUBE: '#ef4444',
		TWITCH: '#a855f7',
		BILIBILI: '#3b82f6',
		NICONICO: '#000'
	}
};

export const getChartColorsByCount = (n: number, currTheme: string): Array<string> => {
	if (n === 0) return chartColors[currTheme];
	return Array(n)
		.fill('')
		.map((_, i) => {
			const j = Math.floor((chartColors[currTheme].length / n) * i);
			return chartColors[currTheme][j];
		});
};
