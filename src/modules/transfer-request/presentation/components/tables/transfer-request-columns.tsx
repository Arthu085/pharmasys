import { Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { AppTableActions } from "@/shared/components/tables/app-table-actions";
import type { ITransferRequestListData } from "@/modules/transfer-request/domain/dtos/transfer-request-list-response.dto";
import { formatDate } from "@/shared/utils/date.util";
import { TransferStatusEnum } from "@/modules/transfer-request/domain/enums/transfer-status.enum";

interface GetTransferRequestColumnsProps {
	onDetails: (transferRequest: ITransferRequestListData) => void;
	isMobile?: boolean;
}

export const getTransferRequestColumns = ({
	onDetails,
	isMobile = false,
}: GetTransferRequestColumnsProps): ColumnsType<ITransferRequestListData> => [
	{
		title: "Data de Requisição",
		dataIndex: "requestDate",
		key: "requestDate",
		width: 300,
		render: (date) => formatDate(date, "DD/MM/YYYY"),
	},
	{
		title: "Status",
		dataIndex: "statusTransfer",
		key: "statusTransfer",
		render: (statusTransfer) => (
			<Tag
				color={
					statusTransfer?.value === TransferStatusEnum.CONCLUIDO
						? "green"
						: statusTransfer?.value === TransferStatusEnum.NEGADO
							? "red"
							: statusTransfer?.value === TransferStatusEnum.SEPARACAO
								? "blue"
								: "orange"
				}>
				{statusTransfer?.label || statusTransfer}
			</Tag>
		),
		width: 250,
	},
	{
		title: "Motivo",
		dataIndex: "reason",
		key: "reason",
		render: (reason) => <Tag color="purple">{reason?.label || reason}</Tag>,
		width: 250,
	},
	{
		title: "Origem",
		dataIndex: "origin",
		key: "origin",
		render: (origin) => <Tag color="cyan">{origin?.label || origin}</Tag>,
		width: 250,
	},
	{
		title: "Destino",
		dataIndex: "destination",
		key: "destination",
		render: (destination) => (
			<Tag color="geekblue">{destination?.label || destination}</Tag>
		),
		width: 250,
	},
	{
		title: "Itens",
		dataIndex: "items",
		key: "items",
		render: (items) =>
			items?.length < 2 ? items?.length + " Item" : items?.length + " Itens",
		width: 250,
	},
	{
		title: "Ações",
		key: "actions",
		render: (_, record) => (
			<AppTableActions
				entityName="Requisição de Transferência"
				onDetails={() => onDetails(record)}
			/>
		),
		fixed: isMobile ? undefined : "right",
		width: 140,
	},
];
