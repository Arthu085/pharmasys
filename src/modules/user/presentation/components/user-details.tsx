import { userService } from "../../infrastructure/user.service";
import { Descriptions, Tag } from "antd";
import { AppModal } from "@/shared/components/modals/app-modal";
import type { IUserDetailsProps } from "../../domain/interfaces/user-details.interface";
import { useFetch } from "@/shared/hooks/use-fetch";
import { StatusEnum } from "@/shared/domain/enums/status.enum";
import type { IUserDetailsData } from "../../domain/dtos/user-details-response.dto";
import { formatDate } from "@/shared/utils/date.util";

export const UserDetails = ({ open, onClose, uuid }: IUserDetailsProps) => {
	const { loading, data: user } = useFetch<IUserDetailsData>(
		uuid,
		open,
		userService.findOne,
		onClose,
	);

	return (
		<AppModal
			title="Detalhes do Usuário"
			open={open}
			onCancel={onClose}
			hideFooter
			loading={loading}>
			{user ? (
				<Descriptions column={1} bordered size="small" layout="horizontal">
					<Descriptions.Item label="Nome Completo">
						{user.name}
					</Descriptions.Item>
					<Descriptions.Item label="E-mail">{user.email}</Descriptions.Item>
					<Descriptions.Item label="Função">
						<Tag color={"blue"}>{user.role.label}</Tag>
					</Descriptions.Item>
					<Descriptions.Item label="Status">
						<Tag
							color={user.status.value === StatusEnum.ATIVO ? "green" : "red"}>
							{user.status.label}
						</Tag>
					</Descriptions.Item>
					<Descriptions.Item label="Usário Criador">
						{user.userCreated || "-"}
					</Descriptions.Item>
					<Descriptions.Item label="Usário Atualizador">
						{user.userUpdated || "-"}
					</Descriptions.Item>
					<Descriptions.Item label="Data de Criação">
						{formatDate(user.createdAt) || "-"}
					</Descriptions.Item>
					<Descriptions.Item label="Data de Atualização">
						{formatDate(user.updatedAt) || "-"}
					</Descriptions.Item>
				</Descriptions>
			) : null}
		</AppModal>
	);
};
