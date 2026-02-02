import { Form } from "antd";
import dayjs from "dayjs";
import { AppModal } from "@/shared/components/modals/app-modal";
import { AppInput } from "@/shared/components/inputs/app-input";
import { AppDateInput } from "@/shared/components/inputs/app-date-input";
import { AppCompanySelect } from "@/shared/components/selects/company/app-company-select";
import { useFormFetch } from "@/shared/hooks/use-form-fetch";
import { useFormSubmit } from "@/shared/hooks/use-form-submit";
import type { IEditProps } from "@/shared/domain/interfaces/edit.interface";
import type { IBatchListData } from "../../domain/dtos/batch-list-response.dto";
import { batchService } from "../../infrastructure/batch.service";
import {
	batchUpdateSchema,
	type IBatchUpdateDto,
} from "../../domain/dtos/batch-update.dto";

export const BatchEdit = ({ open, onClose, uuid, onSuccess }: IEditProps) => {
	const [form] = Form.useForm();
	const { loading: fetching } = useFormFetch<IBatchListData, any>(
		uuid,
		open,
		batchService.findOne,
		form,
		(data) => ({
			...data,
			expirationDate: data.expirationDate
				? dayjs(data.expirationDate).toDate()
				: undefined,
			company: data.company?.label,
		}),
		onClose,
	);

	const handleUpdate = async (dto: IBatchUpdateDto) => {
		if (!uuid) throw new Error("UUID não fornecido");
		return batchService.update(uuid, dto);
	};

	const { saving, handleSubmit } = useFormSubmit<IBatchUpdateDto>(
		handleUpdate,
		() => {
			onSuccess?.();
			onClose();
		},
	);

	return (
		<AppModal
			title="Editar Lote"
			open={open}
			onCancel={onClose}
			onOk={form.submit}
			confirmLoading={saving}
			loading={fetching}>
			<Form<IBatchUpdateDto>
				form={form}
				layout="vertical"
				onFinish={handleSubmit}
				disabled={saving}
				preserve={false}>
				<AppInput
					name="batchCode"
					label="Código do Lote"
					placeholder="Código do lote..."
					zodSchema={batchUpdateSchema.shape.batchCode}
					maxLength={20}
				/>
				<AppDateInput
					name="expirationDate"
					label="Data de Expiração"
					placeholder="Selecione a data"
					format="DD/MM/YYYY"
					zodSchema={batchUpdateSchema.shape.expirationDate}
				/>
				<AppCompanySelect
					name="company"
					label="Empresa"
					placeholder="Selecione a empresa"
					showSearch
					zodSchema={batchUpdateSchema.shape.company}
				/>
			</Form>
		</AppModal>
	);
};
