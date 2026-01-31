import { Descriptions, Tag } from "antd";
import { Fragment } from "react";
import { AppModal } from "@/shared/components/modals/app-modal";
import { useFetchModal } from "@/shared/hooks/use-fetch-modal";
import { StatusEnum } from "@/shared/domain/enums/status.enum";
import { formatDate } from "@/shared/utils/date.util";
import type { ICompanyDetailsData } from "../../domain/dtos/company-details-response.dto";
import { companyService } from "../../infrastructure/company.service";
import type { IDetailsProps } from "@/shared/domain/interfaces/details.interface";

export const CompanyDetails = ({ open, onClose, uuid }: IDetailsProps) => {
	const { loading, data: company } = useFetchModal<ICompanyDetailsData>(
		uuid,
		open,
		companyService.findOne,
		onClose,
	);

	return (
		<AppModal
			title="Detalhes da Empresa"
			open={open}
			onCancel={onClose}
			hideFooter
			loading={loading}>
			{company ? (
				<Descriptions column={1} bordered size="small" layout="horizontal">
					<Descriptions.Item label="Nome Completo">
						{company.name}
					</Descriptions.Item>
					<Descriptions.Item label="CNPJ">{company.cnpj}</Descriptions.Item>
					<Descriptions.Item label="Tipo de Empresa">
						{company.companyTypes.map((type, index) => (
							<Fragment key={type.value}>
								<Tag color="blue">{type.label}</Tag>
								{index < company.companyTypes.length - 1 ? (
									<span> | </span>
								) : null}
							</Fragment>
						))}
					</Descriptions.Item>
					<Descriptions.Item label="Status">
						<Tag
							color={
								company.status.value === StatusEnum.ATIVO ? "green" : "red"
							}>
							{company.status.label}
						</Tag>
					</Descriptions.Item>
					<Descriptions.Item label="Usário Criador">
						{company.userCreated || "-"}
					</Descriptions.Item>
					<Descriptions.Item label="Usário Atualizador">
						{company.userUpdated || "-"}
					</Descriptions.Item>
					<Descriptions.Item label="Data de Criação">
						{formatDate(company.createdAt) || "-"}
					</Descriptions.Item>
					<Descriptions.Item label="Data de Atualização">
						{formatDate(company.updatedAt) || "-"}
					</Descriptions.Item>
				</Descriptions>
			) : null}
		</AppModal>
	);
};
