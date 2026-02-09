import { Form } from "antd";
import { AppModal } from "@/shared/components/modals/app-modal";
import { AppInput } from "@/shared/components/inputs/app-input";
import { AppDateInput } from "@/shared/components/inputs/app-date-input";
import { AppCompanySelect } from "@/shared/components/selects/company/app-company-select";
import { useFormSubmit } from "@/shared/hooks/use-form-submit";
import type { ICreateProps } from "@/shared/domain/interfaces/create.interface";
import {
	batchCreateSchema,
	type IBatchCreateDto,
} from "../../domain/dtos/batch-create.dto";
import { batchService } from "../../infrastructure/batch.service";

export const BatchCreate = ({ open, onClose, onSuccess }: ICreateProps) => {
	const [form] = Form.useForm();

	const handleCreate = async (dto: IBatchCreateDto) => {
		return batchService.create(dto);
	};

	const { saving, handleSubmit } = useFormSubmit<IBatchCreateDto>(
		handleCreate,
		() => {
			onSuccess?.();
			onClose();
		},
	);

	return (
		<AppModal
			title="Criar Lote"
			open={open}
			onCancel={onClose}
			onOk={form.submit}
			confirmLoading={saving}>
			<Form<IBatchCreateDto>
				form={form}
				layout="vertical"
				onFinish={handleSubmit}
				disabled={saving}
				preserve={false}>
				<AppInput
					name="batchCode"
					label="Código do Lote"
					placeholder="Código do lote..."
					zodSchema={batchCreateSchema.shape.batchCode}
					maxLength={20}
				/>
				<AppDateInput
					name="expirationDate"
					label="Data de Expiração"
					placeholder="Selecione a data"
					format="DD/MM/YYYY"
					zodSchema={batchCreateSchema.shape.expirationDate}
				/>
				<AppCompanySelect
					name="company"
					label="Empresa"
					placeholder="Selecione a empresa"
					zodSchema={batchCreateSchema.shape.company}
					showSearch
				/>
			</Form>
		</AppModal>
	);
};
