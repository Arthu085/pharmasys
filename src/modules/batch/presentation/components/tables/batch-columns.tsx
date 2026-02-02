import { Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { StatusEnum } from "@/shared/domain/enums/status.enum";
import { AppTableActions } from "@/shared/components/tables/app-table-actions";
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
		width: 180,
	},
	{
		title: "Empresa",
		dataIndex: "company",
		key: "company",
		width: 180,
		render: (company) => {
			return <Tag color={"blue"}>{company?.label || company}</Tag>;
		},
	},
	{
		title: "Data de Expiração",
		dataIndex: "expirationDate",
		key: "expirationDate",
		width: 180,
		render: (date) => {
			if (!date) return "-";
			return formatDate(date, "DD/MM/YYYY");
		},
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
