import { Typography, Card, Row, Col } from "antd";
import { StatusEnum } from "@/shared/domain/enums/status.enum";
import { StatusFilter } from "@/shared/components/filters/status-filter";
import { AppSearchFilter } from "@/shared/components/filters/app-search-filter";
import { AppButton } from "@/shared/components/buttons/app-button";
import { useList } from "@/shared/hooks/use-list";
import { useModals } from "@/shared/hooks/use-modals";
import type { ICompanyListData } from "../../domain/dtos/company-list-response.dto";
import type { ICompanyFilterDto } from "../../domain/dtos/company-filter.dto";
import { companyService } from "../../infrastructure/company.service";
import { CompanyList } from "../components/company-list";
import { useRowAction } from "@/shared/hooks/use-row-action";
import { CompanyTypeFilter } from "../components/filters/company-type.filter";
import { CompanyCreate } from "../components/company-create";
import { CompanyDetails } from "../components/company-details";
import { CompanyEdit } from "../components/company-edit";

const { Title } = Typography;

export const CompanyPage = () => {
	const modals = useModals<string>();
	const {
		loading,
		data: companies,
		meta,
		filters,
		handleFilterChange,
		handlePageChange,
		refresh,
	} = useList<ICompanyListData, ICompanyFilterDto>(companyService.findAll, {
		page: 1,
		limit: 10,
		status: StatusEnum.ATIVO,
	});

	const { handleAction: handleChangeStatus } = useRowAction(
		companyService.updateStatus,
		refresh,
	);

	const { handleAction: handleDelete } = useRowAction(
		companyService.delete,
		refresh,
	);

	return (
		<>
			<Row
				justify={"space-between"}
				align={"middle"}
				style={{ marginBottom: 16 }}>
				<Col flex="auto">
					<Title level={2}>Empresas</Title>
				</Col>
				<Col
					flex="none"
					style={{ display: "flex", justifyContent: "flex-end" }}>
					<AppButton
						label="Nova Empresa"
						type="primary"
						onClick={() => modals.openCreate()}
					/>
				</Col>
			</Row>
			<Card>
				<Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
					<Col xs={24} sm={12} md={12} lg={6} xl={4}>
						<StatusFilter
							value={filters.status}
							onChange={(val) => handleFilterChange("status", val)}
						/>
					</Col>
					<Col xs={24} sm={12} md={12} lg={8} xl={6}>
						<CompanyTypeFilter
							value={filters.companyType}
							onChange={(val) => handleFilterChange("companyType", val)}
						/>
					</Col>
					<Col xs={24} sm={24} md={12} lg={10} xl={7}>
						<AppSearchFilter
							label="Nome"
							placeholder="Buscar pelo nome..."
							value={filters.name}
							onChange={(val) => handleFilterChange("name", val)}
						/>
					</Col>
					<Col xs={24} sm={24} md={12} lg={12} xl={7}>
						<AppSearchFilter
							label="CNPJ"
							placeholder="Buscar pelo CNPJ..."
							value={filters.cnpj}
							onChange={(val) => handleFilterChange("cnpj", val)}
						/>
					</Col>
				</Row>
				<CompanyList
					loading={loading}
					companies={companies}
					total={meta.total}
					page={filters.page}
					pageSize={filters.limit}
					onChangePage={handlePageChange}
					onEdit={(company) => modals.openEdit(company.uuid)}
					onDetails={(company) => modals.openDetails(company.uuid)}
					onStatus={handleChangeStatus}
					onDelete={handleDelete}
				/>
				<CompanyCreate
					open={modals.isCreateOpen}
					onClose={modals.closeCreate}
					onSuccess={() => {
						modals.closeCreate();
						refresh();
					}}
				/>
				<CompanyEdit
					open={modals.isEditOpen}
					uuid={modals.selectedUuid}
					onClose={modals.closeEdit}
					onSuccess={() => {
						modals.closeEdit();
						refresh();
					}}
				/>
				<CompanyDetails
					open={modals.isDetailsOpen}
					uuid={modals.selectedUuid}
					onClose={modals.closeDetails}
				/>
			</Card>
		</>
	);
};
