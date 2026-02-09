import { Descriptions, Flex, Table, Tag, Typography } from "antd";
import { AppModal } from "@/shared/components/modals/app-modal";
import { useFetchModal } from "@/shared/hooks/use-fetch-modal";
import { formatDate } from "@/shared/utils/date.util";
import type { IDetailsProps } from "@/shared/domain/interfaces/details.interface";
import type { IInventoryEntryDetailsData } from "../../domain/dtos/inventory-entry-details-response.dto";
import type { IInventoryEntryItemResponseDto } from "../../domain/dtos/inventory-entry-item-response.dto";
import { inventoryEntryService } from "../../infrastructure/inventory-entry.service";
import { formatCurrency } from "@/shared/utils/format-currency.util";
import { getInventoryEntryItemColumns } from "./tables/inventory-entry-item-column";

const { Title } = Typography;

const itemColumns = getInventoryEntryItemColumns();

export const InventoryEntryDetails = ({
	open,
	onClose,
	uuid,
}: IDetailsProps) => {
	const { loading, data: inventoryEntry } =
		useFetchModal<IInventoryEntryDetailsData>(
			uuid,
			open,
			inventoryEntryService.findOne,
			onClose,
		);

	return (
		<AppModal
			title="Detalhes da Entrada de Estoque"
			open={open}
			onCancel={onClose}
			hideFooter
			loading={loading}
			width={1100}>
			{inventoryEntry ? (
				<>
					<Descriptions column={1} bordered size="small" layout="horizontal">
						<Descriptions.Item label="Nota Fiscal">
							{inventoryEntry.invoiceNumber || (
								<Tag color="red">Sem Nota Fiscal</Tag>
							)}
						</Descriptions.Item>
						<Descriptions.Item label="Data de Entrada">
							{formatDate(inventoryEntry.entryDate, "DD/MM/YYYY")}
						</Descriptions.Item>
						<Descriptions.Item label="Valor Total">
							{formatCurrency(inventoryEntry.totalValue, { withSymbol: true })}
						</Descriptions.Item>
						<Descriptions.Item label="Tipo de Entrada">
							<Tag color="blue">{inventoryEntry.entryType?.label || "-"}</Tag>
						</Descriptions.Item>
						<Descriptions.Item label="Local de Estoque">
							<Tag color="green">
								{inventoryEntry.stockLocation?.label || "-"}
							</Tag>
						</Descriptions.Item>
						<Descriptions.Item label="Usuário Criador">
							{inventoryEntry.userCreated || "-"}
						</Descriptions.Item>
						<Descriptions.Item label="Data de Criação">
							{formatDate(inventoryEntry.createdAt) || "-"}
						</Descriptions.Item>
					</Descriptions>
					<Flex vertical style={{ marginTop: "16px" }}>
						<Title level={5}>Itens ({inventoryEntry.items?.length ?? 0})</Title>
						<Table<IInventoryEntryItemResponseDto>
							columns={itemColumns}
							dataSource={
								(inventoryEntry.items ?? []) as IInventoryEntryItemResponseDto[]
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
