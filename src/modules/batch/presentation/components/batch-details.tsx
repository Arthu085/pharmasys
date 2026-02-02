import { Descriptions, Tag } from "antd";
import { AppModal } from "@/shared/components/modals/app-modal";
import { useFetchModal } from "@/shared/hooks/use-fetch-modal";
import { StatusEnum } from "@/shared/domain/enums/status.enum";
import { formatDate } from "@/shared/utils/date.util";
import type { IDetailsProps } from "@/shared/domain/interfaces/details.interface";
import type { IBatchDetailsData } from "../../domain/dtos/batch-details-response.dto";
import { batchService } from "../../infrastructure/batch.service";

export const BatchDetails = ({ open, onClose, uuid }: IDetailsProps) => {
	const { loading, data: batch } = useFetchModal<IBatchDetailsData>(
		uuid,
		open,
		batchService.findOne,
		onClose,
	);

	return (
		<AppModal
			title="Detalhes do Lote"
			open={open}
			onCancel={onClose}
			hideFooter
			loading={loading}>
			{batch ? (
				<Descriptions column={1} bordered size="small" layout="horizontal">
					<Descriptions.Item label="Código do Lote">
						{batch.batchCode}
					</Descriptions.Item>
					<Descriptions.Item label="Data de Expiração">
						{formatDate(batch.expirationDate)}
					</Descriptions.Item>
					<Descriptions.Item label="Empresa">
						<Tag color={"blue"}>{batch.company.label}</Tag>
					</Descriptions.Item>
					<Descriptions.Item label="Status">
						<Tag
							color={batch.status.value === StatusEnum.ATIVO ? "green" : "red"}>
							{batch.status.label}
						</Tag>
					</Descriptions.Item>
					<Descriptions.Item label="Usário Criador">
						{batch.userCreated || "-"}
					</Descriptions.Item>
					<Descriptions.Item label="Usário Atualizador">
						{batch.userUpdated || "-"}
					</Descriptions.Item>
					<Descriptions.Item label="Data de Criação">
						{formatDate(batch.createdAt) || "-"}
					</Descriptions.Item>
					<Descriptions.Item label="Data de Atualização">
						{formatDate(batch.updatedAt) || "-"}
					</Descriptions.Item>
				</Descriptions>
			) : null}
		</AppModal>
	);
};
