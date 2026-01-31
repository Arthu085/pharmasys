import type { IUserListData } from "../dtos/user-list-response.dto";
import type { IStatusDto } from "@/shared/domain/dtos/status.dto";

export interface IUserListProps {
	loading: boolean;
	users: IUserListData[];
	total: number;
	onEdit: (user: IUserListData) => void;
	onDetails: (user: IUserListData) => void;
	onStatus: (uuid: string, dto: IStatusDto) => Promise<void>;
	onDelete: (uuid: string) => Promise<void>;
	page: number;
	pageSize: number;
	onChangePage: (page: number, pageSize: number) => void;
}
