import { Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { AppTableActions } from "@/shared/components/tables/app-table-actions";
import { formatDate } from "@/shared/utils/date.util";
import type { IStockTransferListData } from "@/modules/stock-transfer/domain/dtos/stock-transfer-list-response.dto";

interface GetStockTransferColumnsProps {
	onDetails: (stockTransfer: IStockTransferListData) => void;
	isMobile?: boolean;
}

export const getStockTransferColumns = ({
	onDetails,
	isMobile = false,
}: GetStockTransferColumnsProps): ColumnsType<IStockTransferListData> => [
	{
		title: "Data de Transferência",
		dataIndex: "transferDate",
		key: "transferDate",
		width: 250,
		render: (date) => formatDate(date, "DD/MM/YYYY"),
	},
	{
		title: "Origem",
		dataIndex: "origin",
		key: "origin",
		render: (origin) => <Tag color="green">{origin?.label || origin}</Tag>,
		width: 250,
	},
	{
		title: "Destino",
		dataIndex: "destination",
		key: "destination",
		render: (destination) => (
			<Tag color="blue">{destination?.label || destination}</Tag>
		),
		width: 250,
	},
	{
		title: "Itens",
		dataIndex: "items",
		key: "items",
		render: (items) =>
			items.length < 2 ? items.length + " Item" : items.length + " Itens",
		width: 250,
	},
	{
		title: "Ações",
		key: "actions",
		render: (_, record) => (
			<AppTableActions
				entityName="Transferência de Estoque"
				onDetails={() => onDetails(record)}
			/>
		),
		fixed: isMobile ? undefined : "right",
		width: 140,
	},
];
