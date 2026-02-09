import { Typography, Card, Row, Col } from "antd";
import { StatusEnum } from "@/shared/domain/enums/status.enum";
import { StatusFilter } from "@/shared/components/filters/status-filter";
import { AppSearchFilter } from "@/shared/components/filters/app-search-filter";
import { AppButton } from "@/shared/components/buttons/app-button";
import { useList } from "@/shared/hooks/use-list";
import { useModals } from "@/shared/hooks/use-modals";
import { useRowAction } from "@/shared/hooks/use-row-action";
import { PrescriptorCreate } from "../components/prescriptor-create";
import { PrescriptorDetails } from "../components/prescriptor-details";
import { PrescriptorEdit } from "../components/prescriptor-edit";
import type { IPrescriptorListData } from "../../domain/dtos/prescriptor-list-response.dto";
import type { IPrescriptorFilterDto } from "../../domain/dtos/prescriptor-filter.dto";
import { prescriptorService } from "../../infrastructure/prescriptor.service";
import { PrescriptorList } from "../components/prescriptor-list";
import { AdviceFilter } from "../components/filters/advice.filter";
import { StateFilter } from "../components/filters/state.filter";

const { Title } = Typography;

export const PrescriptorPage = () => {
	const modals = useModals<string>();
	const {
		loading,
		data: prescriptors,
		meta,
		filters,
		handleFilterChange,
		handlePageChange,
		refresh,
	} = useList<IPrescriptorListData, IPrescriptorFilterDto>(
		prescriptorService.findAll,
		{
			page: 1,
			limit: 10,
			status: StatusEnum.ATIVO,
		},
	);

	const { handleAction: handleChangeStatus } = useRowAction(
		prescriptorService.updateStatus,
		refresh,
	);

	const { handleAction: handleDelete } = useRowAction(
		prescriptorService.delete,
		refresh,
	);

	return (
		<>
			<Row
				justify={"space-between"}
				align={"middle"}
				style={{ marginBottom: 16 }}>
				<Col flex="auto">
					<Title level={2}>Prescritores</Title>
				</Col>
				<Col
					flex="none"
					style={{ display: "flex", justifyContent: "flex-end" }}>
					<AppButton
						label="Novo Prescritor"
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
					<Col xs={24} sm={12} md={12} lg={9} xl={5}>
						<AppSearchFilter
							label="Nome"
							placeholder="Buscar pelo nome..."
							value={filters.name}
							onChange={(val) => handleFilterChange("name", val)}
						/>
					</Col>
					<Col xs={24} sm={12} md={12} lg={9} xl={5}>
						<AppSearchFilter
							label="Número de Registro"
							placeholder="Buscar pelo número de registro..."
							value={filters.registrationNumber}
							onChange={(val) => handleFilterChange("registrationNumber", val)}
						/>
					</Col>
					<Col xs={24} sm={12} md={12} lg={8} xl={6}>
						<AdviceFilter
							value={filters.advice}
							onChange={(val) => handleFilterChange("advice", val)}
						/>
					</Col>
					<Col xs={24} sm={12} md={12} lg={8} xl={4}>
						<StateFilter
							value={filters.state}
							onChange={(val) => handleFilterChange("state", val)}
						/>
					</Col>
				</Row>
				<PrescriptorList
					loading={loading}
					prescriptors={prescriptors}
					total={meta.total}
					page={filters.page}
					pageSize={filters.limit}
					onChangePage={handlePageChange}
					onEdit={(prescriptor) => modals.openEdit(prescriptor.uuid)}
					onDetails={(prescriptor) => modals.openDetails(prescriptor.uuid)}
					onStatus={handleChangeStatus}
					onDelete={handleDelete}
				/>
				<PrescriptorCreate
					open={modals.isCreateOpen}
					onClose={modals.closeCreate}
					onSuccess={() => {
						modals.closeCreate();
						refresh();
					}}
				/>
				<PrescriptorEdit
					open={modals.isEditOpen}
					uuid={modals.selectedUuid}
					onClose={modals.closeEdit}
					onSuccess={() => {
						modals.closeEdit();
						refresh();
					}}
				/>
				<PrescriptorDetails
					open={modals.isDetailsOpen}
					uuid={modals.selectedUuid}
					onClose={modals.closeDetails}
				/>
			</Card>
		</>
	);
};
