import { Typography, Card, Row, Col } from "antd";
import type { IUserListData } from "../../domain/dtos/user-list-response.dto";
import { userService } from "../../infrastructure/user.service";
import { UserList } from "../components/user-list";
import type { IUserFilterDto } from "../../domain/dtos/user-filter.dto";
import { StatusEnum } from "@/shared/domain/enums/status.enum";
import { StatusFilter } from "@/shared/components/filters/status.filter";
import { RoleFilter } from "@/shared/components/filters/role.filter";
import { AppSearchInput } from "@/shared/components/inputs/app-search-input";
import { AppButton } from "@/shared/components/buttons/app-button";
import { UserCreate } from "../components/user-create";
import { UserEdit } from "../components/user-edit";
import { UserDetails } from "../components/user-details";
import { useList } from "@/shared/hooks/use-list";
import { useModals } from "@/shared/hooks/use-modals";
import { useRowAction } from "@/shared/hooks/use-row-action";

const { Title } = Typography;

export const UserPage = () => {
	const modals = useModals<string>();
	const {
		loading,
		data: users,
		meta,
		filters,
		handleFilterChange,
		handlePageChange,
		refresh,
	} = useList<IUserListData, IUserFilterDto>(userService.findAll, {
		page: 1,
		limit: 10,
		status: StatusEnum.ATIVO,
	});

	const { handleAction: handleChangeStatus } = useRowAction(
		userService.updateStatus,
		refresh,
	);

	const { handleAction: handleDelete } = useRowAction(
		userService.delete,
		refresh,
	);

	return (
		<>
			<Row
				justify={"space-between"}
				align={"middle"}
				style={{ marginBottom: 16 }}>
				<Col flex="auto">
					<Title level={2}>Usuários</Title>
				</Col>
				<Col
					flex="none"
					style={{ display: "flex", justifyContent: "flex-end" }}>
					<AppButton
						label="Novo Usuário"
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
					<Col xs={24} sm={12} md={6} lg={6} xl={6}>
						<RoleFilter
							value={filters.role}
							onChange={(val) => handleFilterChange("role", val)}
						/>
					</Col>
					<Col xs={24} sm={24} md={12} lg={12} xl={10}>
						<AppSearchInput
							label="Nome"
							placeholder="Buscar pelo nome..."
							value={filters.name}
							onChange={(val) => handleFilterChange("name", val)}
						/>
					</Col>
				</Row>
				<UserList
					loading={loading}
					users={users}
					total={meta.total}
					page={filters.page}
					pageSize={filters.limit}
					onChangePage={handlePageChange}
					onEdit={(user) => modals.openEdit(user.uuid)}
					onDetails={(user) => modals.openDetails(user.uuid)}
					onStatus={handleChangeStatus}
					onDelete={handleDelete}
				/>
				<UserCreate
					open={modals.isCreateOpen}
					onClose={modals.closeCreate}
					onSuccess={() => {
						modals.closeCreate();
						refresh();
					}}
				/>
				<UserEdit
					open={modals.isEditOpen}
					uuid={modals.selectedUuid}
					onClose={modals.closeEdit}
					onSuccess={() => {
						modals.closeEdit();
						refresh();
					}}
				/>
				<UserDetails
					open={modals.isDetailsOpen}
					uuid={modals.selectedUuid}
					onClose={modals.closeDetails}
				/>
			</Card>
		</>
	);
};
