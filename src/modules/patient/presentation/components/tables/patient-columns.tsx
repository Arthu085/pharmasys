import type { ColumnsType } from "antd/es/table";
import { AppTableActions } from "@/shared/components/tables/app-table-actions";
import { AppStatusTag } from "@/shared/components/tags/app-status-tag";
import type { IStatusDto } from "@/shared/domain/dtos/status.dto";
import type { IPatientListData } from "@/modules/patient/domain/dtos/patient-list-response.dto";

interface GetPatientColumnsProps {
	onEdit: (patient: IPatientListData) => void;
	onDetails: (patient: IPatientListData) => void;
	onStatus: (uuid: string, dto: IStatusDto) => Promise<void>;
	onDelete: (uuid: string) => Promise<void>;
}

export const getPatientColumns = ({
	onEdit,
	onDetails,
	onStatus,
	onDelete,
}: GetPatientColumnsProps): ColumnsType<IPatientListData> => [
	{
		title: "Nome",
		dataIndex: "name",
		key: "name",
		render: (text) => <strong>{text}</strong>,
		width: 300,
	},
	{
		title: "Documento",
		dataIndex: "document",
		key: "document",
		width: 900,
	},
	{
		title: "Status",
		dataIndex: "status",
		key: "status",
		render: (status) => <AppStatusTag status={status} />,
	},
	{
		title: "Ações",
		key: "actions",
		render: (_, record) => (
			<AppTableActions
				entityName="Paciente"
				onEdit={() => onEdit(record)}
				onDetails={() => onDetails(record)}
				onDelete={() => onDelete(record.uuid)}
				currentStatus={record.status.value}
				onStatus={(dto) => onStatus(record.uuid, dto)}
			/>
		),
	},
];
