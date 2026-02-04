import { Descriptions, Tag } from "antd";
import { AppModal } from "@/shared/components/modals/app-modal";
import { useFetchModal } from "@/shared/hooks/use-fetch-modal";
import { StatusEnum } from "@/shared/domain/enums/status.enum";
import { formatDate } from "@/shared/utils/date.util";
import type { IDetailsProps } from "@/shared/domain/interfaces/details.interface";
import type { IItemDetailsData } from "../../domain/dtos/item-details-response.dto";
import { itemService } from "../../infrastructure/item.service";

export const ItemDetails = ({ open, onClose, uuid }: IDetailsProps) => {
	const { loading, data: item } = useFetchModal<IItemDetailsData>(
		uuid,
		open,
		itemService.findOne,
		onClose,
	);

	return (
		<AppModal
			title="Detalhes do Item"
			open={open}
			onCancel={onClose}
			hideFooter
			loading={loading}>
			{item ? (
				<Descriptions column={1} bordered size="small" layout="horizontal">
					<Descriptions.Item label="Nome">{item.name}</Descriptions.Item>
					<Descriptions.Item label="Tipo">
						<Tag color={"blue"}>{item.type.label}</Tag>
					</Descriptions.Item>
					<Descriptions.Item label="Subtipo">
						<Tag color={"blue"}>{item.subtype ? item.subtype.label : "-"}</Tag>
					</Descriptions.Item>
					<Descriptions.Item label="Dosagem">
						<Tag color={"blue"}>{item.dosage.label}</Tag>
					</Descriptions.Item>
					<Descriptions.Item label="Apresentação">
						<Tag color={"blue"}>{item.presentation.label}</Tag>
					</Descriptions.Item>
					<Descriptions.Item label="Status">
						<Tag
							color={item.status.value === StatusEnum.ATIVO ? "green" : "red"}>
							{item.status.label}
						</Tag>
					</Descriptions.Item>
					<Descriptions.Item label="Usário Criador">
						{item.userCreated || "-"}
					</Descriptions.Item>
					<Descriptions.Item label="Usário Atualizador">
						{item.userUpdated || "-"}
					</Descriptions.Item>
					<Descriptions.Item label="Data de Criação">
						{formatDate(item.createdAt) || "-"}
					</Descriptions.Item>
					<Descriptions.Item label="Data de Atualização">
						{formatDate(item.updatedAt) || "-"}
					</Descriptions.Item>
				</Descriptions>
			) : null}
		</AppModal>
	);
};
