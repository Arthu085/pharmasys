import { Tag, Button, Tooltip, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
	EditOutlined,
	DeleteOutlined,
	StopOutlined,
	EyeOutlined,
	CheckCircleOutlined,
} from "@ant-design/icons";
import { StatusEnum } from "@/shared/domain/enums/status.enum";
import type { IUserListData } from "@/modules/user/domain/dtos/user-list-response.dto";

interface GetUserColumnsProps {
	onEdit: (user: IUserListData) => void;
	onDelete: (user: IUserListData) => void;
}

export const getUserColumns = ({
	onEdit,
	onDelete,
}: GetUserColumnsProps): ColumnsType<IUserListData> => [
	{
		title: "Nome",
		dataIndex: "name",
		key: "name",
		render: (text) => <strong>{text}</strong>,
	},
	{
		title: "E-mail",
		dataIndex: "email",
		key: "email",
	},
	{
		title: "Função",
		dataIndex: "role",
		key: "role",
		render: (role) => <Tag color="blue">{role?.label || role}</Tag>,
	},
	{
		title: "Status",
		dataIndex: "status",
		key: "status",
		width: 120,
		render: (status) => {
			const isActive = status?.value === StatusEnum.ATIVO;

			return (
				<Tag color={isActive ? "success" : "error"}>
					{status?.label || status}
				</Tag>
			);
		},
	},
	{
		title: "Ações",
		key: "actions",
		width: 100,
		fixed: "right",
		render: (_, record) => (
			<Space>
				<Tooltip title="Editar">
					<Button
						type="text"
						icon={<EditOutlined />}
						onClick={() => onEdit(record)}
					/>
				</Tooltip>
				<Tooltip title="Detalhes">
					<Button
						type="text"
						icon={<EyeOutlined />}
						onClick={() => onDelete(record)}
					/>
				</Tooltip>
				{(() => {
					const isActive = record?.status?.value === StatusEnum.ATIVO;

					return (
						<Tooltip title={isActive ? "Inativar" : "Ativar"}>
							<Button
								type="text"
								icon={isActive ? <StopOutlined /> : <CheckCircleOutlined />}
								onClick={() => onDelete(record)}
							/>
						</Tooltip>
					);
				})()}
				<Tooltip title="Excluir">
					<Button
						type="text"
						danger
						icon={<DeleteOutlined />}
						onClick={() => onDelete(record)}
					/>
				</Tooltip>
			</Space>
		),
	},
];
