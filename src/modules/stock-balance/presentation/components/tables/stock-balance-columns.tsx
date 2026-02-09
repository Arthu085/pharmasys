import type { ColumnsType } from "antd/es/table";
import type { IStockBalanceListData } from "@/modules/stock-balance/domain/dtos/stock-balance-list-response.dto";

interface GetStockBalanceColumnsProps {}

export const getStockBalanceColumns =
	({}: GetStockBalanceColumnsProps): ColumnsType<IStockBalanceListData> => [
		{
			title: "Item",
			dataIndex: "item",
			key: "item",
			width: 300,
			render: (item) => item.label,
		},
		{
			title: "Lote",
			dataIndex: "batch",
			key: "batch",
			width: 300,
			render: (batch) => batch.label,
		},
		{
			title: "Local de Estoque",
			dataIndex: "stockLocation",
			key: "stockLocation",
			width: 300,
			render: (stockLocation) => stockLocation.label,
		},
		{
			title: "Quantidade",
			dataIndex: "quantity",
			key: "quantity",
			width: 250,
		},
	];
