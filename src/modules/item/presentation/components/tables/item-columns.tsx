import { Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { AppTableActions } from "@/shared/components/tables/app-table-actions";
import { AppStatusTag } from "@/shared/components/tags/app-status-tag";
import type { IStatusDto } from "@/shared/domain/dtos/status.dto";
import type { IItemListData } from "@/modules/item/domain/dtos/item-list-response.dto";

interface GetItemColumnsProps {
	onEdit: (item: IItemListData) => void;
	onDetails: (item: IItemListData) => void;
	onStatus: (uuid: string, dto: IStatusDto) => Promise<void>;
	onDelete: (uuid: string) => Promise<void>;
}

export const getItemColumns = ({
	onEdit,
	onDetails,
	onStatus,
	onDelete,
}: GetItemColumnsProps): ColumnsType<IItemListData> => [
	{
		title: "Nome",
		dataIndex: "name",
		key: "name",
		render: (text) => <strong>{text}</strong>,
		width: 300,
	},
	{
		title: "Tipo",
		dataIndex: "type",
		key: "type",
		render: (type) => <Tag color="blue">{type?.label || type}</Tag>,
		width: 180,
	},
	{
		title: "Subtipo",
		dataIndex: "subtype",
		key: "subtype",
		render: (subtype) => (
			<Tag color="blue">{subtype?.label || subtype || "-"}</Tag>
		),
		width: 180,
	},
	{
		title: "Dosagem",
		dataIndex: "dosage",
		key: "dosage",
		render: (dosage) => <Tag color="blue">{dosage?.label || dosage}</Tag>,
		width: 100,
	},
	{
		title: "Apresentação",
		dataIndex: "presentation",
		key: "presentation",
		render: (presentation) => (
			<Tag color="blue">{presentation?.label || presentation}</Tag>
		),
		width: 445,
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
				entityName="Item"
				onEdit={() => onEdit(record)}
				onDetails={() => onDetails(record)}
				onDelete={() => onDelete(record.uuid)}
				currentStatus={record.status.value}
				onStatus={(dto) => onStatus(record.uuid, dto)}
			/>
		),
	},
];
