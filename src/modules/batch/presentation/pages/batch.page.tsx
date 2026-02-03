import { Typography, Card, Row, Col } from "antd";
import { StatusEnum } from "@/shared/domain/enums/status.enum";
import { StatusFilter } from "@/shared/components/filters/status-filter";
import { AppSearchFilter } from "@/shared/components/filters/app-search-filter";
import { AppButton } from "@/shared/components/buttons/app-button";
import { useList } from "@/shared/hooks/use-list";
import { useModals } from "@/shared/hooks/use-modals";
import { useRowAction } from "@/shared/hooks/use-row-action";
import type { IBatchListData } from "../../domain/dtos/batch-list-response.dto";
import type { IBatchFilterDto } from "../../domain/dtos/batch-filter.dto";
import { batchService } from "../../infrastructure/batch.service";
import { BatchList } from "../components/batch-list";
import { BatchCreate } from "../components/batch-create";
import { BatchEdit } from "../components/batch-edit";
import { BatchDetails } from "../components/batch-details";
import { AppDateFilter } from "@/shared/components/filters/app-date-filter";
import { AppCompanyFilterSelect } from "@/shared/components/selects/company/app-company-filter-select";

const { Title } = Typography;

export const BatchPage = () => {
	const modals = useModals<string>();
	const {
		loading,
		data: batches,
		meta,
		filters,
		handleFilterChange,
		handlePageChange,
		refresh,
	} = useList<IBatchListData, IBatchFilterDto>(batchService.findAll, {
		page: 1,
		limit: 10,
		status: StatusEnum.ATIVO,
	});

	const { handleAction: handleChangeStatus } = useRowAction(
		batchService.updateStatus,
		refresh,
	);

	const { handleAction: handleDelete } = useRowAction(
		batchService.delete,
		refresh,
	);

	return (
		<>
			<Row
				justify={"space-between"}
				align={"middle"}
				style={{ marginBottom: 16 }}>
				<Col flex="auto">
					<Title level={2}>Lotes</Title>
				</Col>
				<Col
					flex="none"
					style={{ display: "flex", justifyContent: "flex-end" }}>
					<AppButton
						label="Novo Lote"
						type="primary"
						onClick={() => modals.openCreate()}
					/>
				</Col>
			</Row>
			<Card>
				<Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
					<Col xs={24} sm={24} md={12} lg={12} xl={4}>
						<StatusFilter
							value={filters.status}
							onChange={(val) => handleFilterChange("status", val)}
						/>
					</Col>
					<Col xs={24} sm={24} md={12} lg={12} xl={7}>
						<AppSearchFilter
							label="Código do Lote"
							placeholder="Buscar pelo código do lote..."
							value={filters.batchCode}
							onChange={(val) => handleFilterChange("batchCode", val)}
						/>
					</Col>
					<Col xs={24} sm={24} md={12} lg={12} xl={7}>
						<AppCompanyFilterSelect
							label="Empresa"
							placeholder="Buscar pela empresa..."
							value={filters.company}
							onChange={(val) => handleFilterChange("company", val)}
						/>
					</Col>
					<Col xs={24} sm={24} md={12} lg={12} xl={6}>
						<AppDateFilter
							label="Data de Expiração"
							placeholder="Buscar pela data de expiração..."
							value={filters.expirationDate}
							onChange={(val) => handleFilterChange("expirationDate", val)}
						/>
					</Col>
				</Row>
				<BatchList
					loading={loading}
					batches={batches}
					total={meta.total}
					page={filters.page}
					pageSize={filters.limit}
					onChangePage={handlePageChange}
					onEdit={(batch) => modals.openEdit(batch.uuid)}
					onDetails={(batch) => modals.openDetails(batch.uuid)}
					onStatus={handleChangeStatus}
					onDelete={handleDelete}
				/>
				<BatchCreate
					open={modals.isCreateOpen}
					onClose={modals.closeCreate}
					onSuccess={() => {
						modals.closeCreate();
						refresh();
					}}
				/>
				<BatchEdit
					open={modals.isEditOpen}
					uuid={modals.selectedUuid}
					onClose={modals.closeEdit}
					onSuccess={() => {
						modals.closeEdit();
						refresh();
					}}
				/>
				<BatchDetails
					open={modals.isDetailsOpen}
					uuid={modals.selectedUuid}
					onClose={modals.closeDetails}
				/>
			</Card>
		</>
	);
};
