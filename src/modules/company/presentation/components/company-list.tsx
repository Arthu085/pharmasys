import { useMemo } from "react";
import { AppTable } from "@/shared/components/tables/app-table";
import { getCompanyColumns } from "./tables/company-columns";
import type { ICompanyListProps } from "../../domain/interfaces/company-list.interface";
import type { ICompanyListData } from "../../domain/dtos/company-list-response.dto";

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
	const columns = useMemo(
		() => getCompanyColumns({ onEdit, onDetails, onStatus, onDelete }),
		[onEdit, onDetails, onStatus, onDelete],
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
