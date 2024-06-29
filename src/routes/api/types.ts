export type BaseAPIResponse = {
	status: number;
	message: string;
};

export type MetaAPIResponse = {
	page: number;
	limit: number;
	total: number;
};
