import { Descriptions, Flex, Table, Tag, Typography } from "antd";
import { AppModal } from "@/shared/components/modals/app-modal";
import { useFetchModal } from "@/shared/hooks/use-fetch-modal";
import { formatDate } from "@/shared/utils/date.util";
import type { IDetailsProps } from "@/shared/domain/interfaces/details.interface";
import type { IInventoryExitDetailsData } from "../../domain/dtos/inventory-exit-details-response.dto";
import type { IInventoryExitItemResponseDto } from "../../domain/dtos/inventory-exit-item-response.dto";
import { inventoryExitService } from "../../infrastructure/inventory-exit.service";
import { getInventoryExitItemColumns } from "./tables/inventory-entry-item-column";

const { Title } = Typography;

const itemColumns = getInventoryExitItemColumns();

export const InventoryExitDetails = ({
	open,
	onClose,
	uuid,
}: IDetailsProps) => {
	const { loading, data: inventoryExit } =
		useFetchModal<IInventoryExitDetailsData>(
			uuid,
			open,
			inventoryExitService.findOne,
			onClose,
		);

	return (
		<AppModal
			title="Detalhes da Saída de Estoque"
			open={open}
			onCancel={onClose}
			hideFooter
			loading={loading}
			width={1100}>
			{inventoryExit ? (
				<>
					<Descriptions column={1} bordered size="small" layout="horizontal">
						<Descriptions.Item label="Data de Saída">
							{formatDate(inventoryExit.exitDate, "DD/MM/YYYY")}
						</Descriptions.Item>
						<Descriptions.Item label="Notas">
							{inventoryExit.notes}
						</Descriptions.Item>
						<Descriptions.Item label="Tipo de Saída">
							<Tag color="blue">{inventoryExit.exitType?.label || "-"}</Tag>
						</Descriptions.Item>
						<Descriptions.Item label="Local de Estoque">
							<Tag color="green">
								{inventoryExit.stockLocation?.label || "-"}
							</Tag>
						</Descriptions.Item>
						<Descriptions.Item label="Usuário Criador">
							{inventoryExit.userCreated || "-"}
						</Descriptions.Item>
						<Descriptions.Item label="Data de Criação">
							{formatDate(inventoryExit.createdAt) || "-"}
						</Descriptions.Item>
					</Descriptions>
					<Flex vertical style={{ marginTop: "16px" }}>
						<Title level={5}>Itens ({inventoryExit.items?.length ?? 0})</Title>
						<Table<IInventoryExitItemResponseDto>
							columns={itemColumns}
							dataSource={
								(inventoryExit.items ?? []) as IInventoryExitItemResponseDto[]
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
