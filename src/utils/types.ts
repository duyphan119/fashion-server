export type ResponseAPI = {
	code: number;
	message: string;
	data?: any;
};

export type ResponseItems<T> = {
	items: Array<T>;
	count: number;
};

export type QueryParams = {
	pageSize: number;
	page: number;
	sortBy: string;
	sortType: "asc" | "desc";
};
