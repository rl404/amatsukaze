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

export type VtuberLayout = 'grid' | 'card' | 'list';
export type VtuberSort =
	| 'name'
	| '-name'
	| 'debut_date'
	| '-debut_date'
	| 'retirement_date'
	| '-retirement_date'
	| 'subscriber'
	| '-subscriber';

export type VideoChartLayout = 'heatmap' | 'timeline';
export type VideoLayout = 'grid' | 'list';

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
	character_designer: '',
	character_2d_modeler: '',
	character_3d_modeler: '',
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
