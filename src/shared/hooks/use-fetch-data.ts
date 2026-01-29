import { useCallback, useEffect, useState } from "react";
import { Modal, message } from "antd";
import { getErrorMessage } from "../utils/api-erro.util";
import type { IApiResponse } from "@/core/interfaces/api-response.interface";

type FetcherFunction<TData> = () => Promise<IApiResponse<TData>>;

export const useFetchData = <TData>(
	fetcher: FetcherFunction<TData>,
	enabled: boolean = true,
) => {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<TData | null>(null);

	const fetchData = useCallback(async () => {
		try {
			setLoading(true);
			const response = await fetcher();

			if (response.success && response.data) {
				setData(response.data);
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
	}, [fetcher]);

	useEffect(() => {
		if (enabled) fetchData();
	}, [enabled, fetchData]);

	return { loading, data, refresh: fetchData };
};
