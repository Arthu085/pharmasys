import { Typography, Card, Row, Col } from "antd";
import { ItemList } from "../components/item-list";
import { StatusEnum } from "@/shared/domain/enums/status.enum";
import { StatusFilter } from "@/shared/components/filters/status-filter";
import { AppSearchFilter } from "@/shared/components/filters/app-search-filter";
import { AppButton } from "@/shared/components/buttons/app-button";
import { ItemCreate } from "../components/item-create";
import { ItemEdit } from "../components/item-edit";
import { ItemDetails } from "../components/item-details";
import { useList } from "@/shared/hooks/use-list";
import { useModals } from "@/shared/hooks/use-modals";
import { useRowAction } from "@/shared/hooks/use-row-action";
import type { IItemListData } from "../../domain/dtos/item-list-response.dto";
import type { IItemFilterDto } from "../../domain/dtos/item-filter.dto";
import { itemService } from "../../infrastructure/item.service";
import { TypeFilter } from "../components/filters/type.filter";
import { SubtypeFilter } from "../components/filters/subtype.filter";
import { DosageFilter } from "../components/filters/dosage.filter";
import { PresentationFilter } from "../components/filters/presentation.filter";

const { Title } = Typography;

export const ItemPage = () => {
	const modals = useModals<string>();
	const {
		loading,
		data: items,
		meta,
		filters,
		handleFilterChange,
		handlePageChange,
		refresh,
	} = useList<IItemListData, IItemFilterDto>(itemService.findAll, {
		page: 1,
		limit: 10,
		status: StatusEnum.ATIVO,
	});

	const { handleAction: handleChangeStatus } = useRowAction(
		itemService.updateStatus,
		refresh,
	);

	const { handleAction: handleDelete } = useRowAction(
		itemService.delete,
		refresh,
	);

	return (
		<>
			<Row
				justify={"space-between"}
				align={"middle"}
				style={{ marginBottom: 16 }}>
				<Col flex="auto">
					<Title level={2}>Itens</Title>
				</Col>
				<Col
					flex="none"
					style={{ display: "flex", justifyContent: "flex-end" }}>
					<AppButton
						label="Novo Item"
						type="primary"
						onClick={() => modals.openCreate()}
					/>
				</Col>
			</Row>
			<Card>
				<Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
					<Col xs={24} sm={12} md={6} lg={6} xl={4}>
						<StatusFilter
							value={filters.status}
							onChange={(val) => handleFilterChange("status", val)}
						/>
					</Col>
					<Col xs={24} sm={12} md={10} lg={10} xl={8}>
						<AppSearchFilter
							label="Nome"
							placeholder="Buscar pelo nome..."
							value={filters.name}
							onChange={(val) => handleFilterChange("name", val)}
						/>
					</Col>
					<Col xs={24} sm={12} md={8} lg={8} xl={6}>
						<TypeFilter
							value={filters.type}
							onChange={(val) => handleFilterChange("type", val)}
						/>
					</Col>
					<Col xs={24} sm={12} md={8} lg={8} xl={6}>
						<SubtypeFilter
							value={filters.subtype}
							onChange={(val) => handleFilterChange("subtype", val)}
						/>
					</Col>
					<Col xs={24} sm={12} md={8} lg={8} xl={7}>
						<DosageFilter
							value={filters.dosage}
							onChange={(val) => handleFilterChange("dosage", val)}
						/>
					</Col>
					<Col xs={24} sm={12} md={8} lg={8} xl={7}>
						<PresentationFilter
							value={filters.presentation}
							onChange={(val) => handleFilterChange("presentation", val)}
						/>
					</Col>
				</Row>
				<ItemList
					loading={loading}
					items={items}
					total={meta.total}
					page={filters.page}
					pageSize={filters.limit}
					onChangePage={handlePageChange}
					onEdit={(item) => modals.openEdit(item.uuid)}
					onDetails={(item) => modals.openDetails(item.uuid)}
					onStatus={handleChangeStatus}
					onDelete={handleDelete}
				/>
				<ItemCreate
					open={modals.isCreateOpen}
					onClose={modals.closeCreate}
					onSuccess={() => {
						modals.closeCreate();
						refresh();
					}}
				/>
				<ItemEdit
					open={modals.isEditOpen}
					uuid={modals.selectedUuid}
					onClose={modals.closeEdit}
					onSuccess={() => {
						modals.closeEdit();
						refresh();
					}}
				/>
				<ItemDetails
					open={modals.isDetailsOpen}
					uuid={modals.selectedUuid}
					onClose={modals.closeDetails}
				/>
			</Card>
		</>
	);
};
