export interface IApiSuccessResponse<T> {
	success: true;
	message?: string;
	data: T | null;
}

export interface IApiErrorResponse {
	success: false;
	message?: string;
	data: null;
}

export type IApiResponse<T = unknown> =
	| IApiSuccessResponse<T>
	| IApiErrorResponse;

export interface IPaginationMeta {
	total: number;
	page: number;
	limit: number;
	lastPage: number;
}

export interface IPaginatedResponse<T> {
	data: T[];
	meta?: IPaginationMeta;
	message?: string;
}
