import { Descriptions, Flex, Table, Tag, Typography } from "antd";
import { AppModal } from "@/shared/components/modals/app-modal";
import { useFetchModal } from "@/shared/hooks/use-fetch-modal";
import { formatDate } from "@/shared/utils/date.util";
import type { IDetailsProps } from "@/shared/domain/interfaces/details.interface";
import { getTransferRequestItemColumns } from "./tables/transfer-request-item-columns";
import type { ITransferRequestDetailsData } from "../../domain/dtos/transfer-request-details-response.dto";
import { transferRequestService } from "../../infrastructure/transfer-request.service";
import type { ITransferRequestItemResponseDto } from "../../domain/dtos/transfer-request-item-response.dto";
import { TransferStatusEnum } from "../../domain/enums/transfer-status.enum";

const { Title } = Typography;

const itemColumns = getTransferRequestItemColumns();

export const TransferRequestDetails = ({
	open,
	onClose,
	uuid,
}: IDetailsProps) => {
	const { loading, data: transferRequest } =
		useFetchModal<ITransferRequestDetailsData>(
			uuid,
			open,
			transferRequestService.findOne,
			onClose,
		);

	return (
		<AppModal
			title="Detalhes da Solicitação de Transferência"
			open={open}
			onCancel={onClose}
			hideFooter
			loading={loading}
			width={1100}>
			{transferRequest ? (
				<>
					<Descriptions column={1} bordered size="small" layout="horizontal">
						<Descriptions.Item label="Data da Solicitação">
							{formatDate(transferRequest.requestDate, "DD/MM/YYYY")}
						</Descriptions.Item>
						<Descriptions.Item label="Motivo da Transferência">
							<Tag color="purple">{transferRequest.reason?.label || "-"}</Tag>
						</Descriptions.Item>
						<Descriptions.Item label="Origem">
							<Tag color="cyan">{transferRequest.origin?.label || "-"}</Tag>
						</Descriptions.Item>
						<Descriptions.Item label="Destino">
							<Tag color="geekblue">
								{transferRequest.destination?.label || "-"}
							</Tag>
						</Descriptions.Item>
						<Descriptions.Item label="Status da Transferência">
							<Tag
								color={
									transferRequest.statusTransfer?.value ===
									TransferStatusEnum.CONCLUIDO
										? "green"
										: transferRequest.statusTransfer?.value ===
											  TransferStatusEnum.NEGADO
											? "red"
											: transferRequest.statusTransfer?.value ===
												  TransferStatusEnum.SEPARACAO
												? "blue"
												: "orange"
								}>
								{transferRequest.statusTransfer?.label || "-"}
							</Tag>
						</Descriptions.Item>
						<Descriptions.Item label="Usuário Criador">
							{transferRequest.userCreated || "-"}
						</Descriptions.Item>
						<Descriptions.Item label="Data de Criação">
							{formatDate(transferRequest.createdAt) || "-"}
						</Descriptions.Item>
					</Descriptions>
					<Flex vertical style={{ marginTop: "16px" }}>
						<Title level={5}>
							Itens ({transferRequest.items?.length ?? 0})
						</Title>
						<Table<ITransferRequestItemResponseDto>
							columns={itemColumns}
							dataSource={
								(transferRequest.items ??
									[]) as ITransferRequestItemResponseDto[]
							}
							pagination={false}
							size="small"
							bordered
							rowKey={(_, idx) => String(idx)}
							scroll={{ x: true }}
						/>
					</Flex>
				</>
			) : null}
		</AppModal>
	);
};
