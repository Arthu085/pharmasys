import { Form } from "antd";
import { AppModal } from "@/shared/components/modals/app-modal";
import { AppInput } from "@/shared/components/inputs/app-input";
import { AppSelect } from "@/shared/components/selects/app-select";
import { useFormFetch } from "@/shared/hooks/use-form-fetch";
import { useFormSubmit } from "@/shared/hooks/use-form-submit";
import type { IItemListData } from "../../domain/dtos/item-list-response.dto";
import { itemService } from "../../infrastructure/item.service";
import {
	itemUpdateSchema,
	type IItemUpdateDto,
} from "../../domain/dtos/item-update.dto";
import {
	dosageConfig,
	presentationConfig,
	subtypeConfig,
	typeConfig,
} from "../../domain/dtos/item-create.dto";
import type { IEditProps } from "@/shared/domain/interfaces/edit.interface";

export const ItemEdit = ({ open, onClose, uuid, onSuccess }: IEditProps) => {
	const [form] = Form.useForm();

	const { loading: fetching } = useFormFetch<IItemListData, any>(
		uuid,
		open,
		itemService.findOne,
		form,
		(data) => ({
			...data,
			type: data.type.value,
			subtype: data.subtype ? data.subtype.value : null,
			dosage: data.dosage.value,
			presentation: data.presentation.value,
		}),
		onClose,
	);

	const handleUpdate = async (dto: IItemUpdateDto) => {
		if (!uuid) throw new Error("UUID não fornecido");
		return itemService.update(uuid, dto);
	};

	const { saving, handleSubmit } = useFormSubmit<IItemUpdateDto>(
		handleUpdate,
		() => {
			onSuccess?.();
			onClose();
		},
	);

	return (
		<AppModal
			title="Editar Item"
			open={open}
			onCancel={onClose}
			onOk={form.submit}
			confirmLoading={saving}
			loading={fetching}>
			<Form<IItemUpdateDto>
				form={form}
				layout="vertical"
				onFinish={handleSubmit}
				disabled={saving}
				preserve={false}>
				<AppInput
					name="name"
					label="Nome"
					placeholder="Nome do item..."
					zodSchema={itemUpdateSchema.shape.name}
					maxLength={255}
				/>
				<AppSelect
					name="type"
					label="Tipo"
					placeholder="Selecione um tipo"
					options={typeConfig.options}
					zodSchema={itemUpdateSchema.shape.type}
					showSearch={{ optionFilterProp: "label" }}
				/>
				<AppSelect
					name="subtype"
					label="Subtipo"
					placeholder="Selecione um subtipo"
					options={subtypeConfig.options}
					zodSchema={itemUpdateSchema.shape.subtype}
					showSearch={{ optionFilterProp: "label" }}
					allowClear
				/>
				<AppSelect
					name="dosage"
					label="Dosagem"
					placeholder="Selecione uma dosagem"
					options={dosageConfig.options}
					zodSchema={itemUpdateSchema.shape.dosage}
					showSearch={{ optionFilterProp: "label" }}
				/>
				<AppSelect
					name="presentation"
					label="Apresentação"
					placeholder="Selecione uma apresentação"
					options={presentationConfig.options}
					zodSchema={itemUpdateSchema.shape.presentation}
					showSearch={{ optionFilterProp: "label" }}
				/>
			</Form>
		</AppModal>
	);
};
