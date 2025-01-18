export type VtuberLayout = 'grid' | 'card' | 'list' | 'timeline' | 'bar_chart';
export type VtuberSort =
	| 'name'
	| '-name'
	| 'debut_date'
	| '-debut_date'
	| 'retirement_date'
	| '-retirement_date'
	| 'subscriber'
	| '-subscriber'
	| 'monthly_subscriber'
	| '-monthly_subscriber'
	| 'video_count'
	| '-video_count';

export type AgencyLayout = 'grid' | 'list';
export type AgencySort = 'name' | '-name' | 'member' | '-member' | 'subscriber' | '-subscriber';

export type ChannelType = 'YOUTUBE' | 'TWITCH' | 'BILIBILI' | 'NICONICO' | 'OTHER';

export type VideoChartLayout = 'calendar' | 'hourly';

export type TierListSort = 'title' | '-title' | 'updated_at' | '-updated_at';
export type TierListLayout = 'grid' | 'list';

export type VtubersQuery = {
	mode: string;
	names: string;
	name: string;
	original_name: string;
	nickname: string;
	exclude_active: boolean;
	exclude_retired: boolean;
	start_debut_year: string;
	end_debut_year: string;
	start_retired_year: string;
	end_retired_year: string;
	has_2d?: boolean;
	has_3d?: boolean;
	character_designer: string;
	character_2d_modeler: string;
	character_3d_modeler: string;
	in_agency?: boolean;
	agency_id: string;
	language_id: string;
	channel_types: string;
	birthday_day: string;
	start_birthday_month: string;
	end_birthday_month: string;
	blood_types: string;
	genders: string;
	zodiacs: string;
	start_subscriber: string;
	end_subscriber: string;
	start_video_count: string;
	end_video_count: string;
	page: number;
	limit: number;
	sort: VtuberSort;
};
