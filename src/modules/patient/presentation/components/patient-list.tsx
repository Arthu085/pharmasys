import { useMemo } from "react";
import { AppTable } from "@/shared/components/tables/app-table";
import type { IPatientListProps } from "../../domain/interfaces/patient-list.interface";
import type { IPatientListData } from "../../domain/dtos/patient-list-response.dto";
import { getPatientColumns } from "./tables/user-columns";

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
	const columns = useMemo(
		() => getPatientColumns({ onEdit, onDetails, onStatus, onDelete }),
		[onEdit, onDetails, onStatus, onDelete],
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
