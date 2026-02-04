import { Form } from "antd";
import { AppModal } from "@/shared/components/modals/app-modal";
import { AppInput } from "@/shared/components/inputs/app-input";
import { useFormSubmit } from "@/shared/hooks/use-form-submit";
import type { IEditProps } from "@/shared/domain/interfaces/edit.interface";
import type { IStockLocationListData } from "../../domain/dtos/stock-location-list-response.dto";
import { stockLocationService } from "../../infrastructure/stock-location.service";
import {
	stockLocationUpdateSchema,
	type IStockLocationUpdateDto,
} from "../../domain/dtos/stock-location-update.dto";
import { useFormFetch } from "@/shared/hooks/use-form-fetch";

export const StockLocationEdit = ({
	open,
	onClose,
	uuid,
	onSuccess,
}: IEditProps) => {
	const [form] = Form.useForm();

	const { loading: fetching } = useFormFetch<IStockLocationListData, any>(
		uuid,
		open,
		stockLocationService.findOne,
		form,
		(data) => ({
			...data,
		}),
		onClose,
	);

	const handleUpdate = async (dto: IStockLocationUpdateDto) => {
		if (!uuid) throw new Error("UUID não fornecido");
		return stockLocationService.update(uuid, dto);
	};

	const { saving, handleSubmit } = useFormSubmit<IStockLocationUpdateDto>(
		handleUpdate,
		() => {
			onSuccess?.();
			onClose();
		},
	);

	return (
		<AppModal
			title="Editar Local de Estoque"
			open={open}
			onCancel={onClose}
			onOk={form.submit}
			confirmLoading={saving}
			loading={fetching}>
			<Form<IStockLocationUpdateDto>
				form={form}
				layout="vertical"
				onFinish={handleSubmit}
				disabled={saving}
				preserve={false}>
				<AppInput
					name="name"
					label="Nome"
					placeholder="Nome do local de estoque..."
					zodSchema={stockLocationUpdateSchema.shape.name}
					maxLength={100}
				/>
				<AppInput
					name="code"
					label="Código"
					placeholder="Código do local de estoque..."
					zodSchema={stockLocationUpdateSchema.shape.code}
					maxLength={50}
				/>
			</Form>
		</AppModal>
	);
};
