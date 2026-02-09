import { Typography, Card, Row, Col } from "antd";
import { AppButton } from "@/shared/components/buttons/app-button";
import { useList } from "@/shared/hooks/use-list";
import { useModals } from "@/shared/hooks/use-modals";
import { AppDateFilter } from "@/shared/components/filters/app-date-filter";
import { AppStockLocationFilterSelect } from "@/shared/components/selects/stock-location/app-stock-location-filter-select";
import { AppItemFilterSelect } from "@/shared/components/selects/item/app-item-filter-select";
import { AppBatchFilterSelect } from "@/shared/components/selects/batch/app-batch-filter-select";
import type { ITransferRequestListData } from "../../domain/dtos/transfer-request-list-response.dto";
import type { ITransferRequestFilterDto } from "../../domain/dtos/transfer-request-filter.dto";
import { transferRequestService } from "../../infrastructure/transfer-request.service";
import { TransferReasonFilter } from "../components/filters/transfer-reason.filter";
import { TransferStatusFilter } from "../components/filters/transfer-status.filter";
import { TransferRequestList } from "../components/transfer-request-list";
import { TransferRequestCreate } from "../components/transfer-request-create";
import { TransferRequestDetails } from "../components/transfer-request-details";

const { Title } = Typography;

export const TransferRequestPage = () => {
	const modals = useModals<string>();
	const {
		loading,
		data: transfersRequest,
		meta,
		filters,
		handleFilterChange,
		handlePageChange,
		refresh,
	} = useList<ITransferRequestListData, ITransferRequestFilterDto>(
		transferRequestService.findAll,
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
					<Title level={2}>Solicitação de Transferência</Title>
				</Col>
				<Col
					flex="none"
					style={{ display: "flex", justifyContent: "flex-end" }}>
					<AppButton
						label="Nova Solicitação de Transferência"
						type="primary"
						onClick={() => modals.openCreate()}
					/>
				</Col>
			</Row>
			<Card>
				<Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
					<Col xs={24} sm={12} md={12} lg={12} xl={6}>
						<AppDateFilter
							label="Data da Solicitação"
							placeholder="Buscar pela data da solicitação..."
							value={filters.requestDate}
							onChange={(val) => handleFilterChange("requestDate", val)}
						/>
					</Col>
					<Col xs={24} sm={12} md={12} lg={12} xl={6}>
						<TransferReasonFilter
							value={filters.reason}
							onChange={(val) => handleFilterChange("reason", val)}
						/>
					</Col>
					<Col xs={24} sm={12} md={12} lg={12} xl={6}>
						<TransferStatusFilter
							value={filters.statusTransfer}
							onChange={(val) => handleFilterChange("statusTransfer", val)}
						/>
					</Col>
					<Col xs={24} sm={12} md={12} lg={12} xl={8}>
						<AppStockLocationFilterSelect
							label="Origem"
							placeholder="Buscar pela origem..."
							value={filters.origin}
							onChange={(val) => handleFilterChange("origin", val)}
						/>
					</Col>
					<Col xs={24} sm={12} md={12} lg={12} xl={8}>
						<AppStockLocationFilterSelect
							label="Destino"
							placeholder="Buscar pelo destino..."
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
				<TransferRequestList
					loading={loading}
					transfersRequest={transfersRequest}
					total={meta.total}
					page={filters.page}
					pageSize={filters.limit}
					onChangePage={handlePageChange}
					onDetails={(transferRequest) =>
						modals.openDetails(transferRequest.uuid)
					}
				/>
				<TransferRequestCreate
					open={modals.isCreateOpen}
					onClose={modals.closeCreate}
					onSuccess={() => {
						modals.closeCreate();
						refresh();
					}}
				/>
				<TransferRequestDetails
					open={modals.isDetailsOpen}
					uuid={modals.selectedUuid}
					onClose={modals.closeDetails}
				/>
			</Card>
		</>
	);
};
