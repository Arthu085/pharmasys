import { Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { AppTableActions } from "@/shared/components/tables/app-table-actions";
import { AppStatusTag } from "@/shared/components/tags/app-status-tag";
import type { IStatusDto } from "@/shared/domain/dtos/status.dto";
import type { IBatchListData } from "@/modules/batch/domain/dtos/batch-list-response.dto";
import { formatDate } from "@/shared/utils/date.util";

interface GetBatchColumnsProps {
	onEdit: (batch: IBatchListData) => void;
	onDetails: (batch: IBatchListData) => void;
	onStatus: (uuid: string, dto: IStatusDto) => Promise<void>;
	onDelete: (uuid: string) => Promise<void>;
}

export const getBatchColumns = ({
	onEdit,
	onDetails,
	onStatus,
	onDelete,
}: GetBatchColumnsProps): ColumnsType<IBatchListData> => [
	{
		title: "Código do Lote",
		dataIndex: "batchCode",
		key: "batchCode",
		render: (text) => <strong>{text}</strong>,
		width: 300,
	},
	{
		title: "Empresa",
		dataIndex: "company",
		key: "company",
		width: 250,
		render: (company) => {
			return <Tag color={"blue"}>{company?.label || company}</Tag>;
		},
	},
	{
		title: "Data de Expiração",
		dataIndex: "expirationDate",
		key: "expirationDate",
		width: 650,
		render: (date) => {
			if (!date) return "-";
			return formatDate(date, "DD/MM/YYYY");
		},
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
				entityName="Lote"
				onEdit={() => onEdit(record)}
				onDetails={() => onDetails(record)}
				onDelete={() => onDelete(record.uuid)}
				currentStatus={record.status.value}
				onStatus={(dto) => onStatus(record.uuid, dto)}
			/>
		),
	},
];
