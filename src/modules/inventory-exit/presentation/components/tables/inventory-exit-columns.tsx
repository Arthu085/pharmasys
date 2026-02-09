import { Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { AppTableActions } from "@/shared/components/tables/app-table-actions";
import { formatDate } from "@/shared/utils/date.util";
import type { IInventoryExitListData } from "@/modules/inventory-exit/domain/dtos/inventory-exit-list-response.dto";

interface GetInventoryExitColumnsProps {
	onDetails: (inventoryExit: IInventoryExitListData) => void;
	isMobile?: boolean;
}

export const getInventoryExitColumns = ({
	onDetails,
	isMobile = false,
}: GetInventoryExitColumnsProps): ColumnsType<IInventoryExitListData> => [
	{
		title: "Data de Saída",
		dataIndex: "exitDate",
		key: "exitDate",
		width: 300,
		render: (date) => formatDate(date, "DD/MM/YYYY"),
	},
	{
		title: "Notas",
		dataIndex: "notes",
		key: "notes",
		width: 250,
	},
	{
		title: "Tipo de Saída",
		dataIndex: "exitType",
		key: "exitType",
		render: (exitType) => <Tag color="blue">{exitType?.label || exitType}</Tag>,
		width: 250,
	},
	{
		title: "Local de Estoque",
		dataIndex: "stockLocation",
		key: "stockLocation",
		render: (stockLocation) => (
			<Tag color="green">{stockLocation?.label || stockLocation}</Tag>
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
				entityName="Saída de Inventário"
				onDetails={() => onDetails(record)}
			/>
		),
		fixed: isMobile ? undefined : "right",
		width: 140,
	},
];
