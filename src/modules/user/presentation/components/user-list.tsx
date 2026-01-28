import { useMemo } from "react";
import { AppTable } from "@/shared/components/tables/app-table";
import { getUserColumns } from "./tables/user-columns";
import type { IUserListProps } from "../../domain/interfaces/user-list.interface";
import type { IUserListData } from "../../domain/dtos/user-list-response.dto";

export const UserList = ({
	users,
	loading,
	total,
	onEdit,
	onDelete,
	page,
	pageSize,
	onChangePage,
}: IUserListProps) => {
	const columns = useMemo(
		() => getUserColumns({ onEdit, onDelete }),
		[onEdit, onDelete],
	);

	return (
		<AppTable<IUserListData>
			columns={columns}
			dataSource={users}
			loading={loading}
			pagination={{
				current: page,
				pageSize: pageSize,
				total: total,
				onChange: onChangePage,
			}}
			rowKey="uuid"
		/>
	);
};
