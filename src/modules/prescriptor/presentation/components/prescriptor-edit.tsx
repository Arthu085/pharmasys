import { Form } from "antd";
import { AppModal } from "@/shared/components/modals/app-modal";
import { AppInput } from "@/shared/components/inputs/app-input";
import { AppSelect } from "@/shared/components/selects/app-select";
import { useFormFetch } from "@/shared/hooks/use-form-fetch";
import { useFormSubmit } from "@/shared/hooks/use-form-submit";
import type { IEditProps } from "@/shared/domain/interfaces/edit.interface";
import { prescriptorService } from "../../infrastructure/prescriptor.service";
import {
	prescriptorUpdateSchema,
	type IPrescriptorUpdateDto,
} from "../../domain/dtos/prescriptor-update.dto";
import {
	adviceConfig,
	ufConfig,
} from "../../domain/dtos/prescriptor-create.dto";
import type { IPrescriptorListData } from "../../domain/dtos/prescriptor-list-response.dto";

export const PrescriptorEdit = ({
	open,
	onClose,
	uuid,
	onSuccess,
}: IEditProps) => {
	const [form] = Form.useForm();

	const { loading: fetching } = useFormFetch<IPrescriptorListData, any>(
		uuid,
		open,
		prescriptorService.findOne,
		form,
		(data) => ({
			...data,
			specialty: data.specialty ?? undefined,
			state: data.state.value,
			advice: data.advice.value,
		}),
		onClose,
	);

	const handleUpdate = async (dto: IPrescriptorUpdateDto) => {
		if (!uuid) throw new Error("UUID não fornecido");
		return prescriptorService.update(uuid, {
			...dto,
			specialty:
				typeof dto.specialty === "string" && dto.specialty.trim()
					? dto.specialty
					: null,
		});
	};

	const { saving, handleSubmit } = useFormSubmit<IPrescriptorUpdateDto>(
		handleUpdate,
		() => {
			onSuccess?.();
			onClose();
		},
	);

	return (
		<AppModal
			title="Editar Prescritor"
			open={open}
			onCancel={onClose}
			onOk={form.submit}
			confirmLoading={saving}
			loading={fetching}>
			<Form<IPrescriptorUpdateDto>
				form={form}
				layout="vertical"
				onFinish={handleSubmit}
				disabled={saving}
				preserve={false}>
				<AppInput
					name="name"
					label="Nome do Prescritor"
					placeholder="Nome do prescritor..."
					zodSchema={prescriptorUpdateSchema.shape.name}
					maxLength={150}
				/>
				<AppInput
					name="registrationNumber"
					label="Número de Registro"
					placeholder="Número de registro..."
					zodSchema={prescriptorUpdateSchema.shape.registrationNumber}
					maxLength={30}
				/>
				<AppInput
					name="specialty"
					label="Especialidade"
					placeholder="Especialidade..."
					zodSchema={prescriptorUpdateSchema.shape.specialty}
					formatValueFromEvent={(value) => (value.trim() ? value : null)}
					maxLength={150}
				/>
				<AppSelect
					name="state"
					label="Estado"
					placeholder="Selecione um estado"
					options={ufConfig.options}
					zodSchema={prescriptorUpdateSchema.shape.state}
					showSearch={{ optionFilterProp: "label" }}
				/>
				<AppSelect
					name="advice"
					label="Conselho"
					placeholder="Selecione um conselho"
					options={adviceConfig.options}
					zodSchema={prescriptorUpdateSchema.shape.advice}
					showSearch={{ optionFilterProp: "label" }}
				/>
			</Form>
		</AppModal>
	);
};
