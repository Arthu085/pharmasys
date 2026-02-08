import { Descriptions, Flex, Table, Tag, Typography } from "antd";
import { AppModal } from "@/shared/components/modals/app-modal";
import { useFetchModal } from "@/shared/hooks/use-fetch-modal";
import { formatDate } from "@/shared/utils/date.util";
import type { IDetailsProps } from "@/shared/domain/interfaces/details.interface";
import type { IItemDispensationDetailsData } from "../../domain/dtos/item-dispensation-details-response.dto";
import type { IItemDispensationItemResponseDto } from "../../domain/dtos/item-dispensation-item-response.dto";
import { itemDispensationService } from "../../infrastructure/item-dispensation.service";
import { getItemDispensationItemColumns } from "./tables/item-dispensation-item-column";

const { Title } = Typography;

const itemColumns = getItemDispensationItemColumns();

export const ItemDispensationDetails = ({
	open,
	onClose,
	uuid,
}: IDetailsProps) => {
	const { loading, data: itemDispensation } =
		useFetchModal<IItemDispensationDetailsData>(
			uuid,
			open,
			itemDispensationService.findOne,
			onClose,
		);

	return (
		<AppModal
			title="Detalhes da Dispensação de Item"
			open={open}
			onCancel={onClose}
			hideFooter
			loading={loading}
			width={1100}>
			{itemDispensation ? (
				<>
					<Descriptions column={1} bordered size="small" layout="horizontal">
						<Descriptions.Item label="Data da Dispensação">
							{formatDate(itemDispensation.dispensationDate, "DD/MM/YYYY")}
						</Descriptions.Item>
						<Descriptions.Item label="Paciente">
							<Tag color="green">{itemDispensation.patient?.label || "-"}</Tag>
						</Descriptions.Item>
						<Descriptions.Item label="Prescritor">
							<Tag color="green">
								{itemDispensation.prescriptor?.label || "-"}
							</Tag>
						</Descriptions.Item>
						<Descriptions.Item label="Local de Estoque">
							<Tag color="green">
								{itemDispensation.stockLocation?.label || "-"}
							</Tag>
						</Descriptions.Item>
						<Descriptions.Item label="Usuário Criador">
							{itemDispensation.userCreated || "-"}
						</Descriptions.Item>
						<Descriptions.Item label="Data de Criação">
							{formatDate(itemDispensation.createdAt) || "-"}
						</Descriptions.Item>
					</Descriptions>
					<Flex vertical style={{ marginTop: "16px" }}>
						<Title level={5}>
							Itens ({itemDispensation.items?.length ?? 0})
						</Title>
						<Table<IItemDispensationItemResponseDto>
							columns={itemColumns}
							dataSource={
								(itemDispensation.items ??
									[]) as IItemDispensationItemResponseDto[]
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
