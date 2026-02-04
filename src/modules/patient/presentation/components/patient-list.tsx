import { useMemo } from "react";
import { AppTable } from "@/shared/components/tables/app-table";
import type { IPatientListProps } from "../../domain/interfaces/patient-list.interface";
import type { IPatientListData } from "../../domain/dtos/patient-list-response.dto";
import { getPatientColumns } from "./tables/patient-columns";
import { Grid } from "antd";

export const PatientList = ({
	patients,
	loading,
	total,
	onEdit,
	onDetails,
	onStatus,
	onDelete,
	page,
	pageSize,
	onChangePage,
}: IPatientListProps) => {
	const screens = Grid.useBreakpoint();
	const isMobile = (screens.xs && !screens.sm) ?? false;

	const columns = useMemo(
		() =>
			getPatientColumns({ onEdit, onDetails, onStatus, onDelete, isMobile }),
		[onEdit, onDetails, onStatus, onDelete, isMobile],
	);

	return (
		<AppTable<IPatientListData>
			columns={columns}
			dataSource={patients}
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
