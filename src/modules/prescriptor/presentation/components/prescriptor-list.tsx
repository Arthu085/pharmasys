import { useMemo } from "react";
import { AppTable } from "@/shared/components/tables/app-table";
import { getPrescriptorColumns } from "./tables/prescriptor-columns";
import type { IPrescriptorListProps } from "../../domain/interfaces/prescriptor-list.interface";
import type { IPrescriptorListData } from "../../domain/dtos/prescriptor-list-response.dto";
import { Grid } from "antd";

export const PrescriptorList = ({
	prescriptors,
	loading,
	total,
	onEdit,
	onDetails,
	onStatus,
	onDelete,
	page,
	pageSize,
	onChangePage,
}: IPrescriptorListProps) => {
	const screens = Grid.useBreakpoint();
	const isMobile = (screens.xs && !screens.sm) ?? false;

	const columns = useMemo(
		() =>
			getPrescriptorColumns({
				onEdit,
				onDetails,
				onStatus,
				onDelete,
				isMobile,
			}),
		[onEdit, onDetails, onStatus, onDelete, isMobile],
	);

	return (
		<AppTable<IPrescriptorListData>
			columns={columns}
			dataSource={prescriptors}
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
