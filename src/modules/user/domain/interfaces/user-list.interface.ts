import type { IUserListData } from "../dtos/user-list-response.dto";

export interface IUserListProps {
	loading: boolean;
	users: IUserListData[];
	total: number;
	onEdit: (user: IUserListData) => void;
	onDelete: (user: IUserListData) => void;
	page: number;
	pageSize: number;
	onChangePage: (page: number, pageSize: number) => void;
}
