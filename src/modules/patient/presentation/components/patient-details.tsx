import { Descriptions, Tag } from "antd";
import { AppModal } from "@/shared/components/modals/app-modal";
import { useFetchModal } from "@/shared/hooks/use-fetch-modal";
import { StatusEnum } from "@/shared/domain/enums/status.enum";
import { formatDate } from "@/shared/utils/date.util";
import type { IDetailsProps } from "@/shared/domain/interfaces/details.interface";
import { patientService } from "../../infrastructure/patient.service";
import type { IPatientDetailsData } from "../../domain/dtos/patient-details-response.dto";

export const PatientDetails = ({ open, onClose, uuid }: IDetailsProps) => {
	const { loading, data: patient } = useFetchModal<IPatientDetailsData>(
		uuid,
		open,
		patientService.findOne,
		onClose,
	);

	return (
		<AppModal
			title="Detalhes do Paciente"
			open={open}
			onCancel={onClose}
			hideFooter
			loading={loading}>
			{patient ? (
				<Descriptions column={1} bordered size="small" layout="horizontal">
					<Descriptions.Item label="Nome Completo">
						{patient.name}
					</Descriptions.Item>
					<Descriptions.Item label="Documento">
						{patient.document}
					</Descriptions.Item>
					<Descriptions.Item label="Status">
						<Tag
							color={
								patient.status.value === StatusEnum.ATIVO ? "green" : "red"
							}>
							{patient.status.label}
						</Tag>
					</Descriptions.Item>
					<Descriptions.Item label="Usário Criador">
						{patient.userCreated || "-"}
					</Descriptions.Item>
					<Descriptions.Item label="Usário Atualizador">
						{patient.userUpdated || "-"}
					</Descriptions.Item>
					<Descriptions.Item label="Data de Criação">
						{formatDate(patient.createdAt) || "-"}
					</Descriptions.Item>
					<Descriptions.Item label="Data de Atualização">
						{formatDate(patient.updatedAt) || "-"}
					</Descriptions.Item>
				</Descriptions>
			) : null}
		</AppModal>
	);
};
