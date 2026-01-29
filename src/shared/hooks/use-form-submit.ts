import { useState } from "react";
import { Modal, message } from "antd";
import { getErrorMessage } from "../utils/api-erro.util";
import type { IApiResponse } from "@/core/interfaces/api-response.interface";

type SubmitterFunction<TDto> = (data: TDto) => Promise<IApiResponse<any>>;

export const useFormSubmit = <TDto>(
	submitter: SubmitterFunction<TDto>,
	onSuccess?: () => void,
	successMessage: string = "Operação realizada com sucesso",
) => {
	const [saving, setSaving] = useState(false);

	const handleSubmit = async (data: TDto) => {
		try {
			setSaving(true);
			const response = await submitter(data);

			if (response.success) {
				message.success({
					content: response.message || successMessage,
					duration: 5,
				});
				if (onSuccess) onSuccess();
			} else {
				message.error({
					content: response.message || "Erro ao salvar dados",
					duration: 5,
				});
			}
		} catch (error) {
			Modal.error({
				title: "Erro",
				content: getErrorMessage(error),
			});
		} finally {
			setSaving(false);
		}
	};

	return { saving, handleSubmit };
};
