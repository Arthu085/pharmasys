import { Typography, Card, Row, Col } from "antd";
import { AppButton } from "@/shared/components/buttons/app-button";
import { useList } from "@/shared/hooks/use-list";
import { useModals } from "@/shared/hooks/use-modals";
import { StockTransferList } from "../components/stock-transfer-list";
import { StockTransferCreate } from "../components/stock-transfer-create";
import { AppDateFilter } from "@/shared/components/filters/app-date-filter";
import { AppStockLocationFilterSelect } from "@/shared/components/selects/stock-location/app-stock-location-filter-select";
import { AppItemFilterSelect } from "@/shared/components/selects/item/app-item-filter-select";
import { AppBatchFilterSelect } from "@/shared/components/selects/batch/app-batch-filter-select";
import { StockTransferDetails } from "../components/stock-transfer-details";
import type { IStockTransferListData } from "../../domain/dtos/stock-transfer-list-response.dto";
import type { IStockTransferFilterDto } from "../../domain/dtos/stock-transfer-filter.dto";
import { stockTransferService } from "../../infrastructure/stock-transfer.service";

const { Title } = Typography;

export const StockTransferPage = () => {
	const modals = useModals<string>();
	const {
		loading,
		data: stockTransfers,
		meta,
		filters,
		handleFilterChange,
		handlePageChange,
		refresh,
	} = useList<IStockTransferListData, IStockTransferFilterDto>(
		stockTransferService.findAll,
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
					<Title level={2}>Transferência de Estoque</Title>
				</Col>
				<Col
					flex="none"
					style={{ display: "flex", justifyContent: "flex-end" }}>
					<AppButton
						label="Nova Transferência de Estoque"
						type="primary"
						onClick={() => modals.openCreate()}
					/>
				</Col>
			</Row>
			<Card>
				<Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
					<Col xs={24} sm={12} md={12} lg={12} xl={6}>
						<AppDateFilter
							label="Data de Transferência"
							placeholder="Buscar pela data de transferência..."
							value={filters.transferDate}
							onChange={(val) => handleFilterChange("transferDate", val)}
						/>
					</Col>
					<Col xs={24} sm={12} md={12} lg={12} xl={9}>
						<AppStockLocationFilterSelect
							label="Origem"
							placeholder="Buscar pelo local de estoque de origem..."
							value={filters.origin}
							onChange={(val) => handleFilterChange("origin", val)}
						/>
					</Col>
					<Col xs={24} sm={12} md={12} lg={12} xl={9}>
						<AppStockLocationFilterSelect
							label="Destino"
							placeholder="Buscar pelo local de estoque de destino..."
							value={filters.destination}
							onChange={(val) => handleFilterChange("destination", val)}
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
				<StockTransferList
					loading={loading}
					stockTransfers={stockTransfers}
					total={meta.total}
					page={filters.page}
					pageSize={filters.limit}
					onChangePage={handlePageChange}
					onDetails={(stockTransfer) => modals.openDetails(stockTransfer.uuid)}
				/>
				<StockTransferCreate
					open={modals.isCreateOpen}
					onClose={modals.closeCreate}
					onSuccess={() => {
						modals.closeCreate();
						refresh();
					}}
				/>
				<StockTransferDetails
					open={modals.isDetailsOpen}
					uuid={modals.selectedUuid}
					onClose={modals.closeDetails}
				/>
			</Card>
		</>
	);
};
