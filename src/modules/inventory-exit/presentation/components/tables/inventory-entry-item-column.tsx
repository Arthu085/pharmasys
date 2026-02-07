import { Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { IInventoryExitItemResponseDto } from "@/modules/inventory-exit/domain/dtos/inventory-exit-item-response.dto";

interface GetInventoryExitItemColumnsProps {}

export const getInventoryExitItemColumns =
	({}: GetInventoryExitItemColumnsProps = {}): ColumnsType<IInventoryExitItemResponseDto> => [
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
