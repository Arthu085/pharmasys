import { Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { AppTableActions } from "@/shared/components/tables/app-table-actions";
import { AppStatusTag } from "@/shared/components/tags/app-status-tag";
import type { IStatusDto } from "@/shared/domain/dtos/status.dto";
import type { IStockLocationListData } from "@/modules/stock-location/domain/dtos/stock-location-list-response.dto";

interface GetStockLocationColumnsProps {
	onEdit: (stockLocation: IStockLocationListData) => void;
	onDetails: (stockLocation: IStockLocationListData) => void;
	onStatus: (uuid: string, dto: IStatusDto) => Promise<void>;
	onDelete: (uuid: string) => Promise<void>;
	isMobile?: boolean;
}

export const getStockLocationColumns = ({
	onEdit,
	onDetails,
	onStatus,
	onDelete,
	isMobile = false,
}: GetStockLocationColumnsProps): ColumnsType<IStockLocationListData> => [
	{
		title: "Nome",
		dataIndex: "name",
		key: "name",
		render: (text) => <strong>{text}</strong>,
		width: 300,
	},
	{
		title: "Código",
		dataIndex: "code",
		key: "code",
		render: (text, record) => (
			<Tag color={record.isCentralStock ? "green" : "blue"}>{text}</Tag>
		),
		width: 250,
	},
	{
		title: "Central",
		dataIndex: "isCentralStock",
		key: "isCentralStock",
		render: (isCentralStock) => (
			<Tag color={isCentralStock ? "green" : "blue"}>
				{isCentralStock ? "Sim" : "Não"}
			</Tag>
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
				entityName="Local de Estoque"
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
