import { Typography, Card, Row, Col } from "antd";
import { StatusEnum } from "@/shared/domain/enums/status.enum";
import { StatusFilter } from "@/shared/components/filters/status-filter";
import { AppSearchFilter } from "@/shared/components/filters/app-search-filter";
import { AppButton } from "@/shared/components/buttons/app-button";
import { useList } from "@/shared/hooks/use-list";
import { useModals } from "@/shared/hooks/use-modals";
import { useRowAction } from "@/shared/hooks/use-row-action";
import type { IStockLocationListData } from "../../domain/dtos/stock-location-list-response.dto";
import type { IStockLocationFilterDto } from "../../domain/dtos/stock-location-filter.dto";
import { stockLocationService } from "../../infrastructure/stock-location.service";
import { StockLocationList } from "../components/stock-location-list";
import { StockLocationCreate } from "../components/stock-location-create";
import { StockLocationEdit } from "../components/stock-location-edit";
import { StockLocationDetails } from "../components/stock-location-details";

const { Title } = Typography;

export const StockLocationPage = () => {
	const modals = useModals<string>();
	const {
		loading,
		data: stockLocations,
		meta,
		filters,
		handleFilterChange,
		handlePageChange,
		refresh,
	} = useList<IStockLocationListData, IStockLocationFilterDto>(
		stockLocationService.findAll,
		{
			page: 1,
			limit: 10,
			status: StatusEnum.ATIVO,
		},
	);

	const { handleAction: handleChangeStatus } = useRowAction(
		stockLocationService.updateStatus,
		refresh,
	);

	const { handleAction: handleDelete } = useRowAction(
		stockLocationService.delete,
		refresh,
	);

	return (
		<>
			<Row
				justify={"space-between"}
				align={"middle"}
				style={{ marginBottom: 16 }}>
				<Col flex="auto">
					<Title level={2}>Locais de Estoque</Title>
				</Col>
				<Col
					flex="none"
					style={{ display: "flex", justifyContent: "flex-end" }}>
					<AppButton
						label="Novo Local de Estoque"
						type="primary"
						onClick={() => modals.openCreate()}
					/>
				</Col>
			</Row>
			<Card>
				<Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
					<Col xs={24} sm={12} md={12} lg={12} xl={4}>
						<StatusFilter
							value={filters.status}
							onChange={(val) => handleFilterChange("status", val)}
						/>
					</Col>
					<Col xs={24} sm={12} md={12} lg={12} xl={10}>
						<AppSearchFilter
							label="Nome"
							placeholder="Buscar pelo nome..."
							value={filters.name}
							onChange={(val) => handleFilterChange("name", val)}
						/>
					</Col>
					<Col xs={24} sm={24} md={12} lg={12} xl={10}>
						<AppSearchFilter
							label="Código"
							placeholder="Buscar pelo código..."
							value={filters.code}
							onChange={(val) => handleFilterChange("code", val)}
						/>
					</Col>
				</Row>
				<StockLocationList
					loading={loading}
					stockLocations={stockLocations}
					total={meta.total}
					page={filters.page}
					pageSize={filters.limit}
					onChangePage={handlePageChange}
					onEdit={(stockLocation) => modals.openEdit(stockLocation.uuid)}
					onDetails={(stockLocation) => modals.openDetails(stockLocation.uuid)}
					onStatus={handleChangeStatus}
					onDelete={handleDelete}
				/>
				<StockLocationCreate
					open={modals.isCreateOpen}
					onClose={modals.closeCreate}
					onSuccess={() => {
						modals.closeCreate();
						refresh();
					}}
				/>
				<StockLocationEdit
					open={modals.isEditOpen}
					uuid={modals.selectedUuid}
					onClose={modals.closeEdit}
					onSuccess={() => {
						modals.closeEdit();
						refresh();
					}}
				/>
				<StockLocationDetails
					open={modals.isDetailsOpen}
					uuid={modals.selectedUuid}
					onClose={modals.closeDetails}
				/>
			</Card>
		</>
	);
};
