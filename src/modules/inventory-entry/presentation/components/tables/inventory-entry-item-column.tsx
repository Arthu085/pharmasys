import { Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { formatCurrency } from "@/shared/utils/format-currency.util";
import type { IInventoryEntryItemResponseDto } from "@/modules/inventory-entry/domain/dtos/inventory-entry-item-response.dto";

interface GetInventoryEntryItemColumnsProps {}

export const getInventoryEntryItemColumns =
	({}: GetInventoryEntryItemColumnsProps = {}): ColumnsType<IInventoryEntryItemResponseDto> => [
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
		{
			title: "Unitário",
			dataIndex: "unitPrice",
			key: "unitPrice",
			width: 200,
			render: (v: number) => formatCurrency(v, { withSymbol: true }),
		},
		{
			title: "Subtotal",
			key: "subtotal",
			width: 250,
			render: (_, r) =>
				formatCurrency((r.quantity ?? 0) * (r.unitPrice ?? 0), {
					withSymbol: true,
				}),
		},
	];
