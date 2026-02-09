import { Descriptions, Flex, Table, Tag, Typography } from "antd";
import { AppModal } from "@/shared/components/modals/app-modal";
import { useFetchModal } from "@/shared/hooks/use-fetch-modal";
import { formatDate } from "@/shared/utils/date.util";
import type { IDetailsProps } from "@/shared/domain/interfaces/details.interface";
import { getStockTransferItemColumns } from "./tables/stock-transfer-item-column";
import type { IStockTransferDetailsData } from "../../domain/dtos/stock-transfer-details-response.dto";
import { stockTransferService } from "../../infrastructure/stock-transfer.service";
import type { IStockTransferItemResponseDto } from "../../domain/dtos/stock-transfer-item-response.dto";

const { Title } = Typography;

const itemColumns = getStockTransferItemColumns();

export const StockTransferDetails = ({
	open,
	onClose,
	uuid,
}: IDetailsProps) => {
	const { loading, data: stockTransfer } =
		useFetchModal<IStockTransferDetailsData>(
			uuid,
			open,
			stockTransferService.findOne,
			onClose,
		);

	return (
		<AppModal
			title="Detalhes da Transferência de Estoque"
			open={open}
			onCancel={onClose}
			hideFooter
			loading={loading}
			width={1100}>
			{stockTransfer ? (
				<>
					<Descriptions column={1} bordered size="small" layout="horizontal">
						<Descriptions.Item label="Data de Transferência">
							{formatDate(stockTransfer.transferDate, "DD/MM/YYYY")}
						</Descriptions.Item>
						<Descriptions.Item label="Origem">
							<Tag color="green">{stockTransfer.origin?.label || "-"}</Tag>
						</Descriptions.Item>
						<Descriptions.Item label="Destino">
							<Tag color="blue">{stockTransfer.destination?.label || "-"}</Tag>
						</Descriptions.Item>
						<Descriptions.Item label="Usuário Criador">
							{stockTransfer.userCreated || "-"}
						</Descriptions.Item>
						<Descriptions.Item label="Data de Criação">
							{formatDate(stockTransfer.createdAt) || "-"}
						</Descriptions.Item>
					</Descriptions>
					<Flex vertical style={{ marginTop: "16px" }}>
						<Title level={5}>Itens ({stockTransfer.items?.length ?? 0})</Title>
						<Table<IStockTransferItemResponseDto>
							columns={itemColumns}
							dataSource={
								(stockTransfer.items ?? []) as IStockTransferItemResponseDto[]
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
