import { Form } from "antd";
import { AppModal } from "@/shared/components/modals/app-modal";
import { AppInput } from "@/shared/components/inputs/app-input";
import { AppSelect } from "@/shared/components/selects/app-select";
import { useFormSubmit } from "@/shared/hooks/use-form-submit";
import type { ICreateProps } from "@/shared/domain/interfaces/create.interface";
import {
	dosageConfig,
	itemCreateSchema,
	presentationConfig,
	subtypeConfig,
	typeConfig,
	type IItemCreateDto,
} from "../../domain/dtos/item-create.dto";
import { itemService } from "../../infrastructure/item.service";

export const ItemCreate = ({ open, onClose, onSuccess }: ICreateProps) => {
	const [form] = Form.useForm();

	const handleCreate = async (dto: IItemCreateDto) => {
		return itemService.create(dto);
	};

	const { saving, handleSubmit } = useFormSubmit<IItemCreateDto>(
		handleCreate,
		() => {
			onSuccess?.();
			onClose();
		},
	);

	return (
		<AppModal
			title="Criar Item"
			open={open}
			onCancel={onClose}
			onOk={form.submit}
			confirmLoading={saving}>
			<Form<IItemCreateDto>
				form={form}
				layout="vertical"
				onFinish={handleSubmit}
				disabled={saving}
				preserve={false}>
				<AppInput
					name="name"
					label="Nome"
					placeholder="Nome do item..."
					zodSchema={itemCreateSchema.shape.name}
					maxLength={255}
				/>
				<AppSelect
					name="type"
					label="Tipo"
					placeholder="Selecione um tipo"
					options={typeConfig.options}
					zodSchema={itemCreateSchema.shape.type}
					showSearch={{ optionFilterProp: "label" }}
				/>
				<AppSelect
					name="subtype"
					label="Subtipo"
					placeholder="Selecione um subtipo"
					options={subtypeConfig.options}
					zodSchema={itemCreateSchema.shape.subtype}
					showSearch={{ optionFilterProp: "label" }}
					allowClear
				/>
				<AppSelect
					name="dosage"
					label="Dosagem"
					placeholder="Selecione uma dosagem"
					options={dosageConfig.options}
					zodSchema={itemCreateSchema.shape.dosage}
					showSearch={{ optionFilterProp: "label" }}
				/>
				<AppSelect
					name="presentation"
					label="Apresentação"
					placeholder="Selecione uma apresentação"
					options={presentationConfig.options}
					zodSchema={itemCreateSchema.shape.presentation}
					showSearch={{ optionFilterProp: "label" }}
				/>
			</Form>
		</AppModal>
	);
};
