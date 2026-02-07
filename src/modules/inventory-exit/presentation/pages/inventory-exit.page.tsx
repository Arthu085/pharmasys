import { Typography, Card, Row, Col } from "antd";
import { AppButton } from "@/shared/components/buttons/app-button";
import { useList } from "@/shared/hooks/use-list";
import { useModals } from "@/shared/hooks/use-modals";
import { InventoryExitList } from "../components/inventory-exit-list";
import { InventoryExitCreate } from "../components/inventory-exit-create";
import type { IInventoryExitListData } from "../../domain/dtos/inventory-exit-list-response.dto";
import type { IInventoryExitFilterDto } from "../../domain/dtos/inventory-exit-filter.dto";
import { inventoryExitService } from "../../infrastructure/inventory-exit.service";
import { AppDateFilter } from "@/shared/components/filters/app-date-filter";
import { ExitTypeFilter } from "../components/filters/exit-type.filter";
import { AppStockLocationFilterSelect } from "@/shared/components/selects/stock-location/app-stock-location-filter-select";
import { AppItemFilterSelect } from "@/shared/components/selects/item/app-item-filter-select";
import { AppBatchFilterSelect } from "@/shared/components/selects/batch/app-batch-filter-select";
import { InventoryExitDetails } from "../components/inventory-exit-details";

const { Title } = Typography;

export const InventoryExitPage = () => {
	const modals = useModals<string>();
	const {
		loading,
		data: inventoryExits,
		meta,
		filters,
		handleFilterChange,
		handlePageChange,
		refresh,
	} = useList<IInventoryExitListData, IInventoryExitFilterDto>(
		inventoryExitService.findAll,
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
					<Title level={2}>Saída de Estoque</Title>
				</Col>
				<Col
					flex="none"
					style={{ display: "flex", justifyContent: "flex-end" }}>
					<AppButton
						label="Nova Saída de Estoque"
						type="primary"
						onClick={() => modals.openCreate()}
					/>
				</Col>
			</Row>
			<Card>
				<Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
					<Col xs={24} sm={12} md={12} lg={12} xl={8}>
						<AppDateFilter
							label="Data de Saída"
							placeholder="Buscar pela data de saída..."
							value={filters.exitDate}
							onChange={(val) => handleFilterChange("exitDate", val)}
						/>
					</Col>
					<Col xs={24} sm={12} md={12} lg={12} xl={8}>
						<ExitTypeFilter
							value={filters.exitType}
							onChange={(val) => handleFilterChange("exitType", val)}
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
				<InventoryExitList
					loading={loading}
					inventoryExits={inventoryExits}
					total={meta.total}
					page={filters.page}
					pageSize={filters.limit}
					onChangePage={handlePageChange}
					onDetails={(inventoryExit) => modals.openDetails(inventoryExit.uuid)}
				/>
				<InventoryExitCreate
					open={modals.isCreateOpen}
					onClose={modals.closeCreate}
					onSuccess={() => {
						modals.closeCreate();
						refresh();
					}}
				/>
				<InventoryExitDetails
					open={modals.isDetailsOpen}
					uuid={modals.selectedUuid}
					onClose={modals.closeDetails}
				/>
			</Card>
		</>
	);
};
