import type { ITransferRequestItemResponseDto } from "@/modules/transfer-request/domain/dtos/transfer-request-item-response.dto";
import { TransferStatusItemEnum } from "@/modules/transfer-request/domain/enums/transfer-status-item.enum";
import { Tag } from "antd";
import type { ColumnsType } from "antd/es/table";

interface GetTransferRequestItemColumnsProps {}

export const getTransferRequestItemColumns =
	({}: GetTransferRequestItemColumnsProps = {}): ColumnsType<ITransferRequestItemResponseDto> => [
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
			title: "Status do Item",
			dataIndex: "statusTransferItem",
			key: "statusTransferItem",
			render: (statusItem) => (
				<Tag
					color={
						statusItem?.value === TransferStatusItemEnum.FINALIZADO
							? "green"
							: statusItem?.value === TransferStatusItemEnum.CANCELADO
								? "red"
								: statusItem?.value === TransferStatusItemEnum.SEPARACAO
									? "blue"
									: "orange"
					}>
					{statusItem?.label || statusItem || "-"}
				</Tag>
			),
			width: 250,
		},
	];
