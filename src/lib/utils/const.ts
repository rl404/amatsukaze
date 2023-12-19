import { ThemeMode } from './theme';

export const DayNames = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday'
];

export const MonthNames = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];

export const ChannelTypes = ['YOUTUBE', 'TWITCH', 'BILIBILI', 'NICONICO', 'OTHER'];

export const ChartColors = {
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
	debut: ['#22c55e', '#4ade80'],
	retired: ['#ef4444', '#f87171']
};

export const ChartTextColors = {
	[ThemeMode.Dark]: '#e5e5e5',
	[ThemeMode.Light]: '#404040'
};

export const ChartBorderColors = {
	[ThemeMode.Dark]: '#525252',
	[ThemeMode.Light]: '#e5e7eb'
};

export const ChartStrokeColors = {
	[ThemeMode.Dark]: '#171717',
	[ThemeMode.Light]: '#ffffff'
};

export const ChartChannelColors: { [t: string]: { [type: string]: string } } = {
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

export const Zodiacs = [
	'Aries',
	'Pisces',
	'Cancer',
	'Leo',
	'Scorpio',
	'Gemini',
	'Libra',
	'Sagittarius',
	'Aquarius',
	'Virgo',
	'Taurus',
	'Capricorn'
];
