import type { IListProps } from "@/shared/domain/interfaces/list.interface";
import type { IUserListData } from "../dtos/user-list-response.dto";
import type { IStatusDto } from "@/shared/domain/dtos/status.dto";

export interface IUserListProps extends Omit<
	IListProps<IUserListData>,
	"items"
> {
	users: IUserListData[];
	onEdit: (user: IUserListData) => void;
	onDetails: (user: IUserListData) => void;
	onStatus: (uuid: string, dto: IStatusDto) => Promise<void>;
	onDelete: (uuid: string) => Promise<void>;
}
