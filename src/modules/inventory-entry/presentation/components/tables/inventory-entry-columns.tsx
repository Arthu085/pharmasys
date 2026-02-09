import { Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { AppTableActions } from "@/shared/components/tables/app-table-actions";
import type { IInventoryEntryListData } from "@/modules/inventory-entry/domain/dtos/inventory-entry-list-response.dto";
import { formatDate } from "@/shared/utils/date.util";
import { formatCurrency } from "@/shared/utils/format-currency.util";

interface GetInventoryEntryColumnsProps {
	onDetails: (inventoryEntry: IInventoryEntryListData) => void;
	isMobile?: boolean;
}

export const getInventoryEntryColumns = ({
	onDetails,
	isMobile = false,
}: GetInventoryEntryColumnsProps): ColumnsType<IInventoryEntryListData> => [
	{
		title: "Nota Fiscal",
		dataIndex: "invoiceNumber",
		key: "invoiceNumber",
		render: (text) => text || <Tag color="red">Sem Nota Fiscal</Tag>,
		width: 300,
	},
	{
		title: "Data de Entrada",
		dataIndex: "entryDate",
		key: "entryDate",
		width: 250,
		render: (date) => formatDate(date, "DD/MM/YYYY"),
	},
	{
		title: "Valor Total",
		dataIndex: "totalValue",
		key: "totalValue",
		render: (value: number) => formatCurrency(value, { withSymbol: true }),
		width: 250,
	},
	{
		title: "Tipo de Entrada",
		dataIndex: "entryType",
		key: "entryType",
		render: (entryType) => (
			<Tag color="blue">{entryType?.label || entryType}</Tag>
		),
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
				entityName="Entrada de Inventário"
				onDetails={() => onDetails(record)}
			/>
		),
		fixed: isMobile ? undefined : "right",
		width: 140,
	},
];
