import { Typography, Card, Row, Col } from "antd";
import { StatusEnum } from "@/shared/domain/enums/status.enum";
import { StatusFilter } from "@/shared/components/filters/status-filter";
import { AppSearchFilter } from "@/shared/components/filters/app-search-filter";
import { AppButton } from "@/shared/components/buttons/app-button";
import { useList } from "@/shared/hooks/use-list";
import { useModals } from "@/shared/hooks/use-modals";
import { useRowAction } from "@/shared/hooks/use-row-action";
import type { IPatientListData } from "../../domain/dtos/patient-list-response.dto";
import type { IPatientFilterDto } from "../../domain/dtos/patient-filter.dto";
import { patientService } from "../../infrastructure/patient.service";
import { PatientList } from "../components/patient-list";
import { PatientCreate } from "../components/patient-create";
import { PatientEdit } from "../components/patient-edit";
import { PatientDetails } from "../components/patient-details";

const { Title } = Typography;

export const PatientPage = () => {
	const modals = useModals<string>();
	const {
		loading,
		data: patients,
		meta,
		filters,
		handleFilterChange,
		handlePageChange,
		refresh,
	} = useList<IPatientListData, IPatientFilterDto>(patientService.findAll, {
		page: 1,
		limit: 10,
		status: StatusEnum.ATIVO,
	});

	const { handleAction: handleChangeStatus } = useRowAction(
		patientService.updateStatus,
		refresh,
	);

	const { handleAction: handleDelete } = useRowAction(
		patientService.delete,
		refresh,
	);

	return (
		<>
			<Row
				justify={"space-between"}
				align={"middle"}
				style={{ marginBottom: 16 }}>
				<Col flex="auto">
					<Title level={2}>Pacientes</Title>
				</Col>
				<Col
					flex="none"
					style={{ display: "flex", justifyContent: "flex-end" }}>
					<AppButton
						label="Novo Paciente"
						type="primary"
						onClick={() => modals.openCreate()}
					/>
				</Col>
			</Row>
			<Card>
				<Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
					<Col xs={24} sm={24} md={24} lg={12} xl={4}>
						<StatusFilter
							value={filters.status}
							onChange={(val) => handleFilterChange("status", val)}
						/>
					</Col>
					<Col xs={24} sm={24} md={24} lg={12} xl={10}>
						<AppSearchFilter
							label="Nome"
							placeholder="Buscar pelo nome..."
							value={filters.name}
							onChange={(val) => handleFilterChange("name", val)}
						/>
					</Col>
					<Col xs={24} sm={24} md={24} lg={12} xl={10}>
						<AppSearchFilter
							label="Documento"
							placeholder="Buscar pelo documento..."
							value={filters.document}
							onChange={(val) => handleFilterChange("document", val)}
						/>
					</Col>
				</Row>
				<PatientList
					loading={loading}
					patients={patients}
					total={meta.total}
					page={filters.page}
					pageSize={filters.limit}
					onChangePage={handlePageChange}
					onEdit={(patient) => modals.openEdit(patient.uuid)}
					onDetails={(patient) => modals.openDetails(patient.uuid)}
					onStatus={handleChangeStatus}
					onDelete={handleDelete}
				/>
				<PatientCreate
					open={modals.isCreateOpen}
					onClose={modals.closeCreate}
					onSuccess={() => {
						modals.closeCreate();
						refresh();
					}}
				/>
				<PatientEdit
					open={modals.isEditOpen}
					uuid={modals.selectedUuid}
					onClose={modals.closeEdit}
					onSuccess={() => {
						modals.closeEdit();
						refresh();
					}}
				/>
				<PatientDetails
					open={modals.isDetailsOpen}
					uuid={modals.selectedUuid}
					onClose={modals.closeDetails}
				/>
			</Card>
		</>
	);
};
