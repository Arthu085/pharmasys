import { Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { IItemDispensationItemResponseDto } from "@/modules/item-dispensation/domain/dtos/item-dispensation-item-response.dto";

interface GetItemDispensationItemColumnsProps {}

export const getItemDispensationItemColumns =
	({}: GetItemDispensationItemColumnsProps = {}): ColumnsType<IItemDispensationItemResponseDto> => [
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
			title: "Psicotrópico",
			dataIndex: "isPsychotropic",
			key: "isPsychotropic",
			render: (isPsychotropic) =>
				isPsychotropic ? (
					<Tag color="green">Sim</Tag>
				) : (
					<Tag color="red">Não</Tag>
				),
			width: 200,
		},
		{
			title: "Número de Notificação da Prescrição",
			dataIndex: "prescriptionNotificationNumber",
			key: "prescriptionNotificationNumber",
			render: (value) =>
				value ? (
					<Tag color="blue">{value}</Tag>
				) : (
					<Tag color="red">Não informado</Tag>
				),
			width: 250,
		},
		{
			title: "Qtd",
			dataIndex: "quantity",
			key: "quantity",
			width: 200,
		},
	];
