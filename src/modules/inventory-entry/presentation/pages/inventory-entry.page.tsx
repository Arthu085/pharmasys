import { Typography, Card, Row, Col } from "antd";
import { AppSearchFilter } from "@/shared/components/filters/app-search-filter";
import { AppButton } from "@/shared/components/buttons/app-button";
import { useList } from "@/shared/hooks/use-list";
import { useModals } from "@/shared/hooks/use-modals";
import { InventoryEntryList } from "../components/inventory-entry-list";
import { InventoryEntryCreate } from "../components/inventory-entry-create";
import type { IInventoryEntryListData } from "../../domain/dtos/inventory-entry-list-response.dto";
import type { IInventoryEntryFilterDto } from "../../domain/dtos/inventory-entry-filter.dto";
import { inventoryEntryService } from "../../infrastructure/inventory-entry.service";
import { AppDateFilter } from "@/shared/components/filters/app-date-filter";
import { EntryTypeFilter } from "../components/filters/entry-type.filter";
import { AppStockLocationFilterSelect } from "@/shared/components/selects/stock-location/app-stock-location-filter-select";
import { AppItemFilterSelect } from "@/shared/components/selects/item/app-item-filter-select";
import { AppBatchFilterSelect } from "@/shared/components/selects/batch/app-batch-filter-select";
import { InventoryEntryDetails } from "../components/inventory-entry-details";

const { Title } = Typography;

export const InventoryEntryPage = () => {
	const modals = useModals<string>();
	const {
		loading,
		data: inventoryEntries,
		meta,
		filters,
		handleFilterChange,
		handlePageChange,
		refresh,
	} = useList<IInventoryEntryListData, IInventoryEntryFilterDto>(
		inventoryEntryService.findAll,
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
					<Title level={2}>Entrada de Estoque</Title>
				</Col>
				<Col
					flex="none"
					style={{ display: "flex", justifyContent: "flex-end" }}>
					<AppButton
						label="Nova Entrada de Estoque"
						type="primary"
						onClick={() => modals.openCreate()}
					/>
				</Col>
			</Row>
			<Card>
				<Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
					<Col xs={24} sm={12} md={12} lg={12} xl={12}>
						<AppSearchFilter
							label="Nota Fiscal"
							placeholder="Buscar pela nota fiscal..."
							value={filters.invoiceNumber}
							onChange={(val) => handleFilterChange("invoiceNumber", val)}
						/>
					</Col>
					<Col xs={24} sm={12} md={12} lg={12} xl={6}>
						<AppDateFilter
							label="Data de Entrada"
							placeholder="Buscar pela data de entrada..."
							value={filters.entryDate}
							onChange={(val) => handleFilterChange("entryDate", val)}
						/>
					</Col>
					<Col xs={24} sm={12} md={12} lg={12} xl={6}>
						<EntryTypeFilter
							value={filters.entryType}
							onChange={(val) => handleFilterChange("entryType", val)}
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
				<InventoryEntryList
					loading={loading}
					inventoryEntries={inventoryEntries}
					total={meta.total}
					page={filters.page}
					pageSize={filters.limit}
					onChangePage={handlePageChange}
					onDetails={(inventoryEntry) =>
						modals.openDetails(inventoryEntry.uuid)
					}
				/>
				<InventoryEntryCreate
					open={modals.isCreateOpen}
					onClose={modals.closeCreate}
					onSuccess={() => {
						modals.closeCreate();
						refresh();
					}}
				/>
				<InventoryEntryDetails
					open={modals.isDetailsOpen}
					uuid={modals.selectedUuid}
					onClose={modals.closeDetails}
				/>
			</Card>
		</>
	);
};
