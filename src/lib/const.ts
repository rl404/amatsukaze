import type { ChannelType, VtuberSort, VtubersQuery } from './types';

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

export const ChannelTypes: ChannelType[] = ['YOUTUBE', 'TWITCH', 'BILIBILI', 'NICONICO', 'OTHER'];

export const DefaultVtubersQuery: VtubersQuery = {
	mode: 'simple',
	names: '',
	name: '',
	original_name: '',
	nickname: '',
	exclude_active: false,
	exclude_retired: false,
	start_debut_year: '',
	end_debut_year: '',
	start_retired_year: '',
	end_retired_year: '',
	has_2d: undefined,
	has_3d: undefined,
	character_designer: '',
	character_2d_modeler: '',
	character_3d_modeler: '',
	in_agency: undefined,
	agency_id: '',
	language_id: '',
	channel_types: '',
	birthday_day: '',
	start_birthday_month: '',
	end_birthday_month: '',
	blood_types: '',
	genders: '',
	zodiacs: '',
	start_subscriber: '',
	end_subscriber: '',
	start_video_count: '',
	end_video_count: '',
	page: 1,
	limit: 50,
	sort: 'name'
};

export const VtuberSorts: { name: string; value: VtuberSort }[] = [
	{ name: 'Name ASC', value: 'name' },
	{ name: 'Name DESC', value: '-name' },
	{ name: 'Debut Date ASC', value: 'debut_date' },
	{ name: 'Debut Date DESC', value: '-debut_date' },
	{ name: 'Retirement Date ASC', value: 'retirement_date' },
	{ name: 'Retirement Date DESC', value: '-retirement_date' },
	{ name: 'Subscriber ASC', value: 'subscriber' },
	{ name: 'Subscriber DESC', value: '-subscriber' },
	{ name: 'Monthly Subs ASC', value: 'monthly_subscriber' },
	{ name: 'Monthly Subs DESC', value: '-monthly_subscriber' },
	{ name: 'Video Count ASC', value: 'video_count' },
	{ name: 'Video Count DESC', value: '-video_count' }
];

export const ChartTextColors: { [isDark: string]: string } = {
	false: 'rgb(0,0,0)',
	true: 'rgb(255,255,255)'
};

export const ChartBorderColors: { [isDark: string]: string } = {
	false: 'rgb(229,229,229)',
	true: 'rgb(82,82,82)'
};

export const ChartColors: { [isDark: string]: string[] } = {
	false: [
		'#EC4899',
		'#EC4899e6',
		'#EC4899cc',
		'#EC4899b3',
		'#EC489999',
		'#EC489980',
		'#EC489966',
		'#EC48994d',
		'#EC489933',
		'#EC48991a',
		'#EC489900'
	],
	true: [
		'#6366F1',
		'#6366F1e6',
		'#6366F1cc',
		'#6366F1b3',
		'#6366F199',
		'#6366F180',
		'#6366F166',
		'#6366F14d',
		'#6366F133',
		'#6366F11a',
		'#6366F100'
	]
};

export const ChartDebutColors: string[] = ['#0E9F6E', '#4ADE80'];

export const ChartRetiredColors: string[] = ['#F05252', '#F87171'];
