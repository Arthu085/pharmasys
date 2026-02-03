import { Form } from "antd";
import { AppModal } from "@/shared/components/modals/app-modal";
import { AppInput } from "@/shared/components/inputs/app-input";
import { AppSelect } from "@/shared/components/selects/app-select";
import { useFormSubmit } from "@/shared/hooks/use-form-submit";
import type { ICreateProps } from "@/shared/domain/interfaces/create.interface";
import {
	createAdviceOptions,
	createUfOptions,
	prescriptorCreateSchema,
	type IPrescriptorCreateDto,
} from "../../domain/dtos/prescriptor-create.dto";
import { prescriptorService } from "../../infrastructure/prescriptor.service";

export const PrescriptorCreate = ({
	open,
	onClose,
	onSuccess,
}: ICreateProps) => {
	const [form] = Form.useForm();

	const handleCreate = async (dto: IPrescriptorCreateDto) => {
		return prescriptorService.create({
			...dto,
			specialty:
				typeof dto.specialty === "string" && dto.specialty.trim()
					? dto.specialty
					: null,
		});
	};

	const { saving, handleSubmit } = useFormSubmit<IPrescriptorCreateDto>(
		handleCreate,
		() => {
			onSuccess?.();
			onClose();
		},
	);

	return (
		<AppModal
			title="Criar Prescritor"
			open={open}
			onCancel={onClose}
			onOk={form.submit}
			confirmLoading={saving}>
			<Form<IPrescriptorCreateDto>
				form={form}
				layout="vertical"
				onFinish={handleSubmit}
				disabled={saving}
				preserve={false}>
				<AppInput
					name="name"
					label="Nome do Prescritor"
					placeholder="Nome do prescritor..."
					zodSchema={prescriptorCreateSchema.shape.name}
					maxLength={150}
				/>
				<AppInput
					name="registrationNumber"
					label="Número de Registro"
					placeholder="Número de registro..."
					zodSchema={prescriptorCreateSchema.shape.registrationNumber}
					maxLength={30}
				/>
				<AppInput
					name="specialty"
					label="Especialidade"
					placeholder="Especialidade..."
					zodSchema={prescriptorCreateSchema.shape.specialty}
					formatValueFromEvent={(value) => (value.trim() ? value : null)}
					maxLength={150}
				/>
				<AppSelect
					name="state"
					label="Estado"
					placeholder="Selecione um estado"
					options={createUfOptions}
					zodSchema={prescriptorCreateSchema.shape.state}
					showSearch={{ optionFilterProp: "label" }}
				/>
				<AppSelect
					name="advice"
					label="Conselho"
					placeholder="Selecione um conselho"
					options={createAdviceOptions}
					zodSchema={prescriptorCreateSchema.shape.advice}
					showSearch={{ optionFilterProp: "label" }}
				/>
			</Form>
		</AppModal>
	);
};
