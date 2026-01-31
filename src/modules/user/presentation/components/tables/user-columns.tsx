import { Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { StatusEnum } from "@/shared/domain/enums/status.enum";
import type { IUserListData } from "@/modules/user/domain/dtos/user-list-response.dto";
import { AppTableActions } from "@/shared/components/tables/app-table-actions";
import type { IStatusDto } from "@/shared/domain/dtos/status.dto";

interface GetUserColumnsProps {
	onEdit: (user: IUserListData) => void;
	onDetails: (user: IUserListData) => void;
	onStatus: (uuid: string, dto: IStatusDto) => Promise<void>;
	onDelete: (uuid: string) => Promise<void>;
}

export const getUserColumns = ({
	onEdit,
	onDetails,
	onStatus,
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
		width: 130,
		render: (_, record) => (
			<AppTableActions
				entityName="Usuário"
				onEdit={() => onEdit(record)}
				onDetails={() => onDetails(record)}
				onDelete={() => onDelete(record.uuid)}
				currentStatus={record.status.value}
				onStatus={(dto) => onStatus(record.uuid, dto)}
			/>
		),
	},
];
