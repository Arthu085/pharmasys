import { useMemo } from "react";
import { AppTable } from "@/shared/components/tables/app-table";
import { getCompanyColumns } from "./tables/company-columns";
import type { ICompanyListProps } from "../../domain/interfaces/company-list.interface";
import type { ICompanyListData } from "../../domain/dtos/company-list-response.dto";
import { Grid } from "antd";

export const CompanyList = ({
	companies,
	loading,
	total,
	onEdit,
	onDetails,
	onStatus,
	onDelete,
	page,
	pageSize,
	onChangePage,
}: ICompanyListProps) => {
	const screens = Grid.useBreakpoint();
	const isMobile = (screens.xs && !screens.sm) ?? false;

	const columns = useMemo(
		() =>
			getCompanyColumns({ onEdit, onDetails, onStatus, onDelete, isMobile }),
		[onEdit, onDetails, onStatus, onDelete, isMobile],
	);

	return (
		<AppTable<ICompanyListData>
			columns={columns}
			dataSource={companies}
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
