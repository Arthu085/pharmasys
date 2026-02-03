import { Descriptions, Tag } from "antd";
import { AppModal } from "@/shared/components/modals/app-modal";
import { useFetchModal } from "@/shared/hooks/use-fetch-modal";
import { StatusEnum } from "@/shared/domain/enums/status.enum";
import { formatDate } from "@/shared/utils/date.util";
import type { IDetailsProps } from "@/shared/domain/interfaces/details.interface";
import type { IPrescriptorDetailsData } from "../../domain/dtos/prescriptor-details-response.dto";
import { prescriptorService } from "../../infrastructure/prescriptor.service";

export const PrescriptorDetails = ({ open, onClose, uuid }: IDetailsProps) => {
	const { loading, data: prescriptor } = useFetchModal<IPrescriptorDetailsData>(
		uuid,
		open,
		prescriptorService.findOne,
		onClose,
	);

	return (
		<AppModal
			title="Detalhes do Prescritor"
			open={open}
			onCancel={onClose}
			hideFooter
			loading={loading}>
			{prescriptor ? (
				<Descriptions column={1} bordered size="small" layout="horizontal">
					<Descriptions.Item label="Nome Completo">
						{prescriptor.name}
					</Descriptions.Item>
					<Descriptions.Item label="Número de Registro">
						{prescriptor.registrationNumber}
					</Descriptions.Item>
					<Descriptions.Item label="Especialidade">
						{prescriptor.specialty || "-"}
					</Descriptions.Item>
					<Descriptions.Item label="Estado">
						{prescriptor.state.label}
					</Descriptions.Item>
					<Descriptions.Item label="Conselho">
						<Tag color={"blue"}>{prescriptor.advice.label}</Tag>
					</Descriptions.Item>
					<Descriptions.Item label="Status">
						<Tag
							color={
								prescriptor.status.value === StatusEnum.ATIVO ? "green" : "red"
							}>
							{prescriptor.status.label}
						</Tag>
					</Descriptions.Item>
					<Descriptions.Item label="Usário Criador">
						{prescriptor.userCreated || "-"}
					</Descriptions.Item>
					<Descriptions.Item label="Usário Atualizador">
						{prescriptor.userUpdated || "-"}
					</Descriptions.Item>
					<Descriptions.Item label="Data de Criação">
						{formatDate(prescriptor.createdAt) || "-"}
					</Descriptions.Item>
					<Descriptions.Item label="Data de Atualização">
						{formatDate(prescriptor.updatedAt) || "-"}
					</Descriptions.Item>
				</Descriptions>
			) : null}
		</AppModal>
	);
};
