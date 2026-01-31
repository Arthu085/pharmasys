import { Grid, Space, Tooltip, Popconfirm } from "antd";
import {
	EditOutlined,
	DeleteOutlined,
	EyeOutlined,
	StopOutlined,
	CheckCircleOutlined,
} from "@ant-design/icons";
import { StatusEnum } from "@/shared/domain/enums/status.enum";
import type { IStatusDto } from "@/shared/domain/dtos/status.dto";
import { AppButton } from "@/shared/components/buttons/app-button";

interface AppTableActionsProps {
	entityName?: string;
	onEdit?: () => void;
	onDetails?: () => void;
	onDelete?: () => Promise<void> | void;
	currentStatus?: StatusEnum;
	onStatus?: (dto: IStatusDto) => Promise<void> | void;
}

export const AppTableActions = ({
	entityName = "Usuário",
	onEdit,
	onDetails,
	onDelete,
	onStatus,
	currentStatus,
}: AppTableActionsProps) => {
	const screens = Grid.useBreakpoint();
	const isMobile = screens.xs && !screens.sm;

	const isActive = currentStatus === StatusEnum.ATIVO;
	const nextStatus = isActive ? StatusEnum.INATIVO : StatusEnum.ATIVO;
	const statusActionVerb = isActive ? "inativar" : "ativar";
	const statusTooltip = isActive
		? `Inativar ${entityName}`
		: `Ativar ${entityName}`;

	return (
		<Space className="app-table-actions" size={4} wrap>
			{onEdit && (
				<Tooltip title={isMobile ? undefined : "Editar"}>
					<AppButton
						size="small"
						type="text"
						icon={<EditOutlined />}
						onClick={onEdit}
					/>
				</Tooltip>
			)}
			{onDetails && (
				<Tooltip title={isMobile ? undefined : "Detalhes"}>
					<AppButton
						size="small"
						type="text"
						icon={<EyeOutlined />}
						onClick={onDetails}
					/>
				</Tooltip>
			)}
			{onStatus && currentStatus && (
				<Popconfirm
					title={`${isActive ? "Inativar" : "Ativar"} ${entityName}`}
					description={`Tem certeza que deseja ${statusActionVerb} este ${entityName.toLowerCase()}?`}
					onConfirm={() => onStatus({ status: nextStatus })}
					okText="Sim"
					cancelText="Não">
					<Tooltip title={isMobile ? undefined : statusTooltip}>
						<AppButton
							size="small"
							type="text"
							style={{ color: isActive ? "#faad14" : "#52c41a" }}
							icon={isActive ? <StopOutlined /> : <CheckCircleOutlined />}
						/>
					</Tooltip>
				</Popconfirm>
			)}
			{onDelete && (
				<Popconfirm
					title={`Excluir ${entityName}`}
					description="Essa ação não pode ser desfeita. Tem certeza?"
					onConfirm={onDelete}
					okText="Sim, Excluir"
					cancelText="Cancelar"
					okButtonProps={{ danger: true }}>
					<Tooltip title={isMobile ? undefined : "Excluir"}>
						<AppButton
							size="small"
							type="text"
							danger
							icon={<DeleteOutlined />}
						/>
					</Tooltip>
				</Popconfirm>
			)}
		</Space>
	);
};
