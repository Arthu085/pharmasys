import { Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { AppTableActions } from "@/shared/components/tables/app-table-actions";
import { AppStatusTag } from "@/shared/components/tags/app-status-tag";
import type { IStatusDto } from "@/shared/domain/dtos/status.dto";
import type { ICompanyListData } from "@/modules/company/domain/dtos/company-list-response.dto";

interface GetCompanyColumnsProps {
	onEdit: (company: ICompanyListData) => void;
	onDetails: (company: ICompanyListData) => void;
	onStatus: (uuid: string, dto: IStatusDto) => Promise<void>;
	onDelete: (uuid: string) => Promise<void>;
}

export const getCompanyColumns = ({
	onEdit,
	onDetails,
	onStatus,
	onDelete,
}: GetCompanyColumnsProps): ColumnsType<ICompanyListData> => [
	{
		title: "Nome",
		dataIndex: "name",
		key: "name",
		render: (text) => <strong>{text}</strong>,
		width: 300,
	},
	{
		title: "CNPJ",
		dataIndex: "cnpj",
		key: "cnpj",
		width: 250,
	},
	{
		title: "Tipo de Empresa",
		dataIndex: "companyTypes",
		key: "companyTypes",
		render: (companyTypes: ICompanyListData["companyTypes"]) => {
			if (!companyTypes?.length) {
				return "-";
			}

			return (
				<>
					{companyTypes.map((type, index) => (
						<span key={type.value}>
							{index > 0 ? <span style={{ margin: "0 6px" }}>|</span> : null}
							<Tag color="blue">{type.label}</Tag>
						</span>
					))}
				</>
			);
		},
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
				entityName="Empresa"
				onEdit={() => onEdit(record)}
				onDetails={() => onDetails(record)}
				onDelete={() => onDelete(record.uuid)}
				currentStatus={record.status.value}
				onStatus={(dto) => onStatus(record.uuid, dto)}
			/>
		),
	},
];
