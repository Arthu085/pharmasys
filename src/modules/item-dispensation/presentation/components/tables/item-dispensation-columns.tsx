import { Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { AppTableActions } from "@/shared/components/tables/app-table-actions";
import { formatDate } from "@/shared/utils/date.util";
import type { IItemDispensationListData } from "@/modules/item-dispensation/domain/dtos/item-dispensation-list-response.dto";

interface GetItemDispensationColumnsProps {
	onDetails: (itemDispensation: IItemDispensationListData) => void;
	isMobile?: boolean;
}

export const getItemDispensationColumns = ({
	onDetails,
	isMobile = false,
}: GetItemDispensationColumnsProps): ColumnsType<IItemDispensationListData> => [
	{
		title: "Data de Dispensação",
		dataIndex: "dispensationDate",
		key: "dispensationDate",
		width: 300,
		render: (date) => formatDate(date, "DD/MM/YYYY"),
	},
	{
		title: "Paciente",
		dataIndex: "patient",
		key: "patient",
		render: (patient) => <Tag color="blue">{patient?.label || patient}</Tag>,
		width: 250,
	},
	{
		title: "Prescritor",
		dataIndex: "prescriptor",
		key: "prescriptor",
		render: (prescriptor) => (
			<Tag color="geekblue">{prescriptor?.label || prescriptor}</Tag>
		),
		width: 250,
	},
	{
		title: "Local de Estoque",
		dataIndex: "stockLocation",
		key: "stockLocation",
		render: (stockLocation) => (
			<Tag color="green">{stockLocation?.label || stockLocation}</Tag>
		),
		width: 250,
	},
	{
		title: "Itens",
		dataIndex: "items",
		key: "items",
		render: (items) =>
			items.length < 2 ? items.length + " Item" : items.length + " Itens",
		width: 250,
	},
	{
		title: "Ações",
		key: "actions",
		render: (_, record) => (
			<AppTableActions
				entityName="Dispensação"
				onDetails={() => onDetails(record)}
			/>
		),
		fixed: isMobile ? undefined : "right",
		width: 140,
	},
];
