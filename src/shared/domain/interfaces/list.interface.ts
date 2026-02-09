export interface IListProps<TItem> {
	loading: boolean;
	items: TItem[];
	total: number;
	page: number;
	pageSize: number;
	onChangePage: (page: number, pageSize: number) => void;
}
