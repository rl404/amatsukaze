import type {
	TierListResponseData,
	TierListResponseDataTier,
	TierListResponseDataVtuber
} from '../routes/(app)/tier-lists/[id]/[...title]/+page.server';

export type BaseAPIResponse = {
	status: number;
	message: string;
};

export type MetaAPIResponse = {
	page: number;
	limit: number;
	total: number;
};

export type BadgeSize = '' | 'sm';

export type VtuberLayout = 'grid' | 'card' | 'list' | 'timeline';
export type VtuberSort =
	| 'name'
	| '-name'
	| 'debut_date'
	| '-debut_date'
	| 'retirement_date'
	| '-retirement_date'
	| 'subscriber'
	| '-subscriber';

export type AgencyLayout = 'grid' | 'list';
export type AgencySort = 'name' | '-name' | 'member' | '-member' | 'subscriber' | '-subscriber';

export type VideoChartLayout = 'heatmap' | 'timeline';
export type VideoLayout = 'grid' | 'list';

export type TierListSort = 'title' | '-title' | 'updated_at' | '-updated_at';
export type TierListLayout = 'grid' | 'list';

export type VtubersQuery = {
	names: string;
	name: string;
	original_name: string;
	nickname: string;
	exclude_active: boolean;
	exclude_retired: boolean;
	start_debut_year: number;
	end_debut_year: number;
	start_retired_year: number;
	end_retired_year: number;
	has_2d?: boolean;
	has_3d?: boolean;
	character_designer: string;
	character_2d_modeler: string;
	character_3d_modeler: string;
	in_agency?: boolean;
	agency: string;
	channel_types: string;
	birthday_day: number;
	start_birthday_month: number;
	end_birthday_month: number;
	blood_types: string;
	genders: string;
	zodiacs: string;
	start_subscriber: number;
	end_subscriber: number;
	page: number;
	limit: number;
	sort: VtuberSort;
};

export const defaultVtubersQuery: VtubersQuery = {
	names: '',
	name: '',
	original_name: '',
	nickname: '',
	exclude_active: false,
	exclude_retired: false,
	start_debut_year: 0,
	end_debut_year: 0,
	start_retired_year: 0,
	end_retired_year: 0,
	has_2d: undefined,
	has_3d: undefined,
	character_designer: '',
	character_2d_modeler: '',
	character_3d_modeler: '',
	in_agency: undefined,
	agency: '',
	channel_types: '',
	birthday_day: 0,
	start_birthday_month: 0,
	end_birthday_month: 0,
	blood_types: '',
	genders: '',
	zodiacs: '',
	start_subscriber: 0,
	end_subscriber: 0,
	page: 1,
	limit: 36,
	sort: 'name'
};

export type SelectOption = {
	label: string;
	value: string;
};

export type Tier = TierListResponseDataTier & {
	id: string;
	vtubers: TierVtuber[];
};

export type TierVtuber = TierListResponseDataVtuber & {
	isDndShadowItem?: boolean;
};

export type TierListQuery = {
	query: string;
	user_id: string;
	sort: TierListSort;
	page: number;
	limit: number;
};

export const defaultTierListQuery: TierListQuery = {
	query: '',
	user_id: '',
	sort: '-updated_at',
	page: 1,
	limit: 28
};

export const defaultTierList: TierListResponseData = {
	id: '',
	title: 'Title',
	description: 'Tier list description...',
	tiers: [
		{
			label: 'S',
			description: '',
			color: 'bg-red-500 dark:bg-red-600',
			size: 'text-3xl',
			vtubers: []
		},
		{
			label: 'A',
			description: '',
			color: 'bg-orange-500 dark:bg-orange-600',
			size: 'text-3xl',
			vtubers: []
		},
		{
			label: 'B',
			description: '',
			color: 'bg-yellow-500 dark:bg-yellow-600',
			size: 'text-3xl',
			vtubers: []
		},
		{
			label: 'C',
			description: '',
			color: 'bg-green-500 dark:bg-green-600',
			size: 'text-3xl',
			vtubers: []
		},
		{
			label: 'D',
			description: '',
			color: 'bg-blue-500 dark:bg-blue-600',
			size: 'text-3xl',
			vtubers: []
		}
	],
	options: [],
	user: {
		id: 0,
		username: ''
	},
	updated_at: ''
};
