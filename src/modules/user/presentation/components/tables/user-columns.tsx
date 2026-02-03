import { Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { IUserListData } from "@/modules/user/domain/dtos/user-list-response.dto";
import { AppTableActions } from "@/shared/components/tables/app-table-actions";
import { AppStatusTag } from "@/shared/components/tags/app-status-tag";
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
		width: 300,
	},
	{
		title: "E-mail",
		dataIndex: "email",
		key: "email",
		width: 250,
	},
	{
		title: "Função",
		dataIndex: "role",
		key: "role",
		render: (role) => <Tag color="blue">{role?.label || role}</Tag>,
		width: 650,
	},
	{
		title: "Status",
		dataIndex: "status",
		key: "status",
		render: (status) => <AppStatusTag status={status} />,
	},
	{
		title: "Ações",
		key: "actions",
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
