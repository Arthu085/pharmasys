import { Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { IStockTransferItemResponseDto } from "@/modules/stock-transfer/domain/dtos/stock-transfer-item-response.dto";

interface GetStockTransferItemColumnsProps {}

export const getStockTransferItemColumns =
	({}: GetStockTransferItemColumnsProps = {}): ColumnsType<IStockTransferItemResponseDto> => [
		{
			title: "Item",
			dataIndex: "item",
			key: "item",
			render: (item) => item?.label ?? <Tag color="red">Não informado</Tag>,
			width: 300,
		},
		{
			title: "Lote",
			dataIndex: "batch",
			key: "batch",
			render: (batch) => batch?.label ?? <Tag color="red">Não informado</Tag>,
			width: 250,
		},
		{
			title: "Qtd",
			dataIndex: "quantity",
			key: "quantity",
			width: 200,
		},
	];
