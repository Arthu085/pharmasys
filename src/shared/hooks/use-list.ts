import { useState, useEffect, useCallback } from "react";
import { Modal, message } from "antd";
import { getErrorMessage } from "../utils/api-erro.util";
import type {
	IApiResponse,
	IPaginatedResponse,
} from "@/core/interfaces/api-response.interface";

type ServiceFinder<TFilter, TResponse> = (
	params: TFilter,
) => Promise<IApiResponse<IPaginatedResponse<TResponse>>>;

export const useList = <TData, TFilter>(
	serviceFinder: ServiceFinder<TFilter, TData>,
	initialFilters: TFilter,
) => {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<TData[]>([]);
	const [meta, setMeta] = useState({ total: 0, page: 1, limit: 10 });
	const [filters, setFilters] = useState<TFilter>(initialFilters);

	const fetchData = useCallback(async () => {
		try {
			setLoading(true);
			const response = await serviceFinder(filters);

			if (response.success && response.data) {
				setData(response.data.data);

				if (response.data.meta) {
					setMeta(response.data.meta);
				}
			} else {
				message.error(response.message || "Não foi possível carregar os dados");
			}
		} catch (error) {
			Modal.error({
				title: "Erro",
				content: getErrorMessage(error),
			});
		} finally {
			setLoading(false);
		}
	}, [filters, serviceFinder]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const handleFilterChange = (key: keyof TFilter, value: any) => {
		setFilters((prev) => ({
			...prev,
			[key]: value,
			page: 1,
		}));
	};

	const handlePageChange = (page: number, pageSize: number) => {
		setFilters((prev) => ({ ...prev, page, limit: pageSize }));
	};

	return {
		loading,
		data,
		meta,
		filters,
		setFilters,
		handleFilterChange,
		handlePageChange,
		refresh: fetchData,
	};
};
