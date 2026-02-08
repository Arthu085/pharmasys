import { Typography, Card, Row, Col } from "antd";
import { AppButton } from "@/shared/components/buttons/app-button";
import { useList } from "@/shared/hooks/use-list";
import { useModals } from "@/shared/hooks/use-modals";
import { ItemDispensationList } from "../components/item-dispensation-list";
import { ItemDispensationCreate } from "../components/item-dispensation-create";
import type { IItemDispensationListData } from "../../domain/dtos/item-dispensation-list-response.dto";
import type { IItemDispensationFilterDto } from "../../domain/dtos/item-dispensation-filter.dto";
import { itemDispensationService } from "../../infrastructure/item-dispensation.service";
import { AppDateFilter } from "@/shared/components/filters/app-date-filter";
import { AppStockLocationFilterSelect } from "@/shared/components/selects/stock-location/app-stock-location-filter-select";
import { AppItemFilterSelect } from "@/shared/components/selects/item/app-item-filter-select";
import { AppBatchFilterSelect } from "@/shared/components/selects/batch/app-batch-filter-select";
import { ItemDispensationDetails } from "../components/item-dispensation-details";
import { AppPatientFilterSelect } from "@/shared/components/selects/patient/app-patient-filter-select";
import { AppPrescriptorFilterSelect } from "@/shared/components/selects/prescriptor/app-prescriptor-filter-select";

const { Title } = Typography;

export const ItemDispensationPage = () => {
	const modals = useModals<string>();
	const {
		loading,
		data: itemsDispensation,
		meta,
		filters,
		handleFilterChange,
		handlePageChange,
		refresh,
	} = useList<IItemDispensationListData, IItemDispensationFilterDto>(
		itemDispensationService.findAll,
		{
			page: 1,
			limit: 10,
		},
	);

	return (
		<>
			<Row
				justify={"space-between"}
				align={"middle"}
				style={{ marginBottom: 16 }}>
				<Col flex="auto">
					<Title level={2}>Dispensação de Item</Title>
				</Col>
				<Col
					flex="none"
					style={{ display: "flex", justifyContent: "flex-end" }}>
					<AppButton
						label="Nova Dispensação de Item"
						type="primary"
						onClick={() => modals.openCreate()}
					/>
				</Col>
			</Row>
			<Card>
				<Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
					<Col xs={24} sm={12} md={12} lg={12} xl={8}>
						<AppDateFilter
							label="Data de Dispensação"
							placeholder="Buscar pela data de dispensação..."
							value={filters.dispensationDate}
							onChange={(val) => handleFilterChange("dispensationDate", val)}
						/>
					</Col>
					<Col xs={24} sm={12} md={12} lg={12} xl={8}>
						<AppPatientFilterSelect
							label="Paciente"
							placeholder="Buscar pelo paciente..."
							value={filters.patient}
							onChange={(val) => handleFilterChange("patient", val)}
						/>
					</Col>
					<Col xs={24} sm={12} md={12} lg={12} xl={8}>
						<AppPrescriptorFilterSelect
							label="Prescritor"
							placeholder="Buscar pelo prescritor..."
							value={filters.prescriptor}
							onChange={(val) => handleFilterChange("prescriptor", val)}
						/>
					</Col>
					<Col xs={24} sm={12} md={12} lg={12} xl={8}>
						<AppStockLocationFilterSelect
							label="Local de Estoque"
							placeholder="Buscar pelo local de estoque..."
							value={filters.stockLocation}
							onChange={(val) => handleFilterChange("stockLocation", val)}
						/>
					</Col>
					<Col xs={24} sm={12} md={12} lg={12} xl={8}>
						<AppItemFilterSelect
							label="Item"
							placeholder="Buscar pelo item..."
							value={filters.item}
							onChange={(val) => handleFilterChange("item", val)}
						/>
					</Col>
					<Col xs={24} sm={12} md={12} lg={12} xl={8}>
						<AppBatchFilterSelect
							label="Lote"
							placeholder="Buscar pelo lote..."
							value={filters.batch}
							onChange={(val) => handleFilterChange("batch", val)}
						/>
					</Col>
				</Row>
				<ItemDispensationList
					loading={loading}
					itemsDispensation={itemsDispensation}
					total={meta.total}
					page={filters.page}
					pageSize={filters.limit}
					onChangePage={handlePageChange}
					onDetails={(itemDispensation) =>
						modals.openDetails(itemDispensation.uuid)
					}
				/>
				<ItemDispensationCreate
					open={modals.isCreateOpen}
					onClose={modals.closeCreate}
					onSuccess={() => {
						modals.closeCreate();
						refresh();
					}}
				/>
				<ItemDispensationDetails
					open={modals.isDetailsOpen}
					uuid={modals.selectedUuid}
					onClose={modals.closeDetails}
				/>
			</Card>
		</>
	);
};
