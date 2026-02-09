import { useMemo } from "react";
import { AppTable } from "@/shared/components/tables/app-table";
import { getUserColumns } from "./tables/user-columns";
import type { IUserListProps } from "../../domain/interfaces/user-list.interface";
import type { IUserListData } from "../../domain/dtos/user-list-response.dto";
import { Grid } from "antd";

export const UserList = ({
	users,
	loading,
	total,
	onEdit,
	onDetails,
	onStatus,
	onDelete,
	page,
	pageSize,
	onChangePage,
}: IUserListProps) => {
	const screens = Grid.useBreakpoint();
	const isMobile = (screens.xs && !screens.sm) ?? false;

	const columns = useMemo(
		() => getUserColumns({ onEdit, onDetails, onStatus, onDelete, isMobile }),
		[onEdit, onDetails, onStatus, onDelete, isMobile],
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
