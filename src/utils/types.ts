export type ResponseAPI = {
	code: number;
	message: string;
	data?: any;
};

export type ResponseItems<T> = {
	items: Array<T>;
	count: number;
};
