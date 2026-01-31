import { useState } from "react";
import { message, Modal } from "antd";
import { getErrorMessage } from "../utils/api-erro.util";
import type { IApiResponse } from "@/core/interfaces/api-response.interface";

type ActionFunction<TArgs extends any[]> = (
	...args: TArgs
) => Promise<IApiResponse<any>>;

export const useRowAction = <TArgs extends any[]>(
	actionFn: ActionFunction<TArgs>,
	onSuccess: () => void,
	successMessage?: string,
) => {
	const [loading, setLoading] = useState(false);

	const handleAction = async (...args: TArgs) => {
		try {
			setLoading(true);
			const response = await actionFn(...args);

			if (response.success) {
				message.success(response.message || successMessage);
				onSuccess();
			} else {
				message.error(response.message || "Não foi possível realizar a ação");
			}
		} catch (error) {
			Modal.error({
				title: "Erro",
				content: getErrorMessage(error),
			});
		} finally {
			setLoading(false);
		}
	};

	return {
		loading,
		handleAction,
	};
};
