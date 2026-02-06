import { Typography, Card, Row, Col } from "antd";
import { useList } from "@/shared/hooks/use-list";
import { StockBalanceList } from "../components/stock-balance-list";
import type { IStockBalanceListData } from "../../domain/dtos/stock-balance-list-response.dto";
import type { IStockBalanceFilterDto } from "../../domain/dtos/stock-balance-filter.dto";
import { stockBalanceService } from "../../infrastructure/stock-balance.service";
import { AppItemFilterSelect } from "@/shared/components/selects/item/app-item-filter-select";
import { AppBatchFilterSelect } from "@/shared/components/selects/batch/app-batch-filter-select";
import { AppStockLocationFilterSelect } from "@/shared/components/selects/stock-location/app-stock-location-filter-select";

const { Title } = Typography;

export const StockBalancePage = () => {
	const {
		loading,
		data: stockBalances,
		meta,
		filters,
		handleFilterChange,
		handlePageChange,
	} = useList<IStockBalanceListData, IStockBalanceFilterDto>(
		stockBalanceService.findAll,
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
					<Title level={2}>Saldos de Estoque</Title>
				</Col>
			</Row>
			<Card>
				<Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
					<Col xs={24} sm={24} md={12} lg={8} xl={8}>
						<AppItemFilterSelect
							label="Item"
							placeholder="Buscar pelo item..."
							value={filters.item}
							onChange={(val) => handleFilterChange("item", val)}
						/>
					</Col>
					<Col xs={24} sm={24} md={12} lg={8} xl={8}>
						<AppBatchFilterSelect
							label="Lote"
							placeholder="Buscar pelo lote..."
							value={filters.batch}
							onChange={(val) => handleFilterChange("batch", val)}
						/>
					</Col>
					<Col xs={24} sm={24} md={12} lg={8} xl={8}>
						<AppStockLocationFilterSelect
							label="Local de Estoque"
							placeholder="Buscar pelo local de estoque..."
							value={filters.stockLocation}
							onChange={(val) => handleFilterChange("stockLocation", val)}
						/>
					</Col>
				</Row>
				<StockBalanceList
					loading={loading}
					stockBalances={stockBalances}
					total={meta.total}
					page={filters.page}
					pageSize={filters.limit}
					onChangePage={handlePageChange}
				/>
			</Card>
		</>
	);
};
