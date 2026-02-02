import { Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { StatusEnum } from "@/shared/domain/enums/status.enum";
import { AppTableActions } from "@/shared/components/tables/app-table-actions";
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
	},
	{
		title: "Documento",
		dataIndex: "document",
		key: "document",
	},
	{
		title: "Status",
		dataIndex: "status",
		key: "status",
		width: 120,
		render: (status) => {
			const isActive = status?.value === StatusEnum.ATIVO;

			return (
				<Tag color={isActive ? "success" : "error"}>
					{status?.label || status}
				</Tag>
			);
		},
	},
	{
		title: "Ações",
		key: "actions",
		width: 130,
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
