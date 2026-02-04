import type { ColumnsType } from "antd/es/table";
import { AppTableActions } from "@/shared/components/tables/app-table-actions";
import { AppStatusTag } from "@/shared/components/tags/app-status-tag";
import type { IStatusDto } from "@/shared/domain/dtos/status.dto";
import type { IPrescriptorListData } from "@/modules/prescriptor/domain/dtos/prescriptor-list-response.dto";
import { Tag } from "antd";

interface GetPrescriptorColumnsProps {
	onEdit: (prescriptor: IPrescriptorListData) => void;
	onDetails: (prescriptor: IPrescriptorListData) => void;
	onStatus: (uuid: string, dto: IStatusDto) => Promise<void>;
	onDelete: (uuid: string) => Promise<void>;
	isMobile?: boolean;
}

export const getPrescriptorColumns = ({
	onEdit,
	onDetails,
	onStatus,
	onDelete,
	isMobile = false,
}: GetPrescriptorColumnsProps): ColumnsType<IPrescriptorListData> => [
	{
		title: "Nome",
		dataIndex: "name",
		key: "name",
		render: (text) => <strong>{text}</strong>,
		width: 300,
		fixed: isMobile ? undefined : "left",
	},
	{
		title: "Número de Registro",
		dataIndex: "registrationNumber",
		key: "registrationNumber",
		width: 250,
	},
	{
		title: "Especialidade",
		dataIndex: "specialty",
		key: "specialty",
		render: (specialty: string) => specialty || "-",
		width: 250,
	},
	{
		title: "Estado",
		dataIndex: "state",
		key: "state",
		render: (state) => state?.label || state?.value,
		width: 250,
	},
	{
		title: "Conselho",
		dataIndex: "advice",
		key: "advice",
		render: (advice) => (
			<Tag color={"blue"}>{advice?.label || advice?.value}</Tag>
		),
	},
	{
		title: "Status",
		dataIndex: "status",
		key: "status",
		render: (status) => <AppStatusTag status={status} />,
		fixed: isMobile ? undefined : "right",
		width: 150,
	},
	{
		title: "Ações",
		key: "actions",
		render: (_, record) => (
			<AppTableActions
				entityName="Prescritor"
				onEdit={() => onEdit(record)}
				onDetails={() => onDetails(record)}
				onDelete={() => onDelete(record.uuid)}
				currentStatus={record.status.value}
				onStatus={(dto) => onStatus(record.uuid, dto)}
			/>
		),
		fixed: isMobile ? undefined : "right",
		width: 140,
	},
];
