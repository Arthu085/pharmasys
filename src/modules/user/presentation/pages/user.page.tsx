import { useEffect, useState } from "react";
import { Typography, Card, message, Row, Col, Modal } from "antd";
import type { IUserListResponse } from "../../domain/dtos/user-list-response.dto";
import { userService } from "../../infrastructure/user.service";
import { UserList } from "../components/user-list";
import type { IUserFilterDto } from "../../domain/dtos/user-filter.dto";
import { StatusEnum } from "@/shared/domain/enums/status.enum";
import { StatusFilter } from "@/shared/components/filters/status.filter";
import { RoleFilter } from "@/shared/components/filters/role.filter";
import { AppSearchInput } from "@/shared/components/inputs/app-search-input";
import { getErrorMessage } from "@/shared/utils/api-erro.util";
import { AppButton } from "@/shared/components/buttons/app-button";

const { Title } = Typography;

export const UserPage = () => {
	const [loading, setLoading] = useState(true);
	const [filters, setFilters] = useState<IUserFilterDto>({
		page: 1,
		limit: 10,
		status: StatusEnum.ATIVO,
	});
	const [data, setData] = useState<IUserListResponse | null>(null);

	const fetch = async () => {
		try {
			setLoading(true);

			const response = await userService.findAll(filters);

			if (response.success && response.data) {
				setData(response);
			} else {
				message.error({
					content: response.message || "Não foi possível carregar os dados",
					duration: 5,
				});
			}
		} catch (error) {
			const msg = getErrorMessage(error);

			Modal.error({
				title: "Erro",
				content: msg,
			});
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetch();
	}, [filters]);

	const handleFilterChange = (key: keyof IUserFilterDto, value: any) => {
		setFilters((prev) => ({
			...prev,
			[key]: value,
			page: 1,
		}));
	};

	const users = data?.data?.data || [];
	const meta = data?.data?.meta;

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
					<AppButton label="Novo Usuário" type="primary" />
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
					total={meta?.total || 0}
					page={filters.page}
					pageSize={filters.limit}
					onChangePage={(p, l) => {
						setFilters((prev) => ({ ...prev, page: p, limit: l }));
					}}
					onEdit={(user) => console.log("Edit", user)}
					onDelete={(user) => console.log("Delete", user)}
				/>
			</Card>
		</>
	);
};
