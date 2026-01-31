import { useState, useEffect } from "react";
import { Modal, type FormInstance } from "antd";
import { getErrorMessage } from "../utils/api-erro.util";
import type { IApiResponse } from "@/core/interfaces/api-response.interface";

type FetcherFunction<TData> = (uuid: string) => Promise<IApiResponse<TData>>;
type MapperFunction<TData, TFormValues> = (data: TData) => TFormValues;

export const useFormFetch = <TData, TFormValues = TData>(
	uuid: string | null | undefined,
	open: boolean,
	fetcher: FetcherFunction<TData>,
	form: FormInstance<TFormValues>,
	mapper?: MapperFunction<TData, TFormValues>,
	onError?: () => void,
) => {
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (open && uuid) {
			fetchData(uuid);
		} else if (!open) {
			form.resetFields();
		}
	}, [open, uuid]);

	const fetchData = async (uuid: string) => {
		try {
			setLoading(true);
			const response = await fetcher(uuid);

			if (response.success && response.data) {
				const rawData = response.data;
				const formData = mapper
					? mapper(rawData)
					: (rawData as unknown as TFormValues);

				form.setFieldsValue(formData as any);
			} else {
				handleError(response.message || "Erro ao carregar dados");
			}
		} catch (error) {
			handleError(getErrorMessage(error));
		} finally {
			setLoading(false);
		}
	};

	const handleError = (msg: string) => {
		if (onError) onError();

		Modal.error({
			title: "Erro",
			content: msg,
		});
	};

	return { loading };
};
