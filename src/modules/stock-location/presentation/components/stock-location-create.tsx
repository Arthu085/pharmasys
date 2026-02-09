import { Form } from "antd";
import { AppModal } from "@/shared/components/modals/app-modal";
import { AppInput } from "@/shared/components/inputs/app-input";
import { useFormSubmit } from "@/shared/hooks/use-form-submit";
import type { ICreateProps } from "@/shared/domain/interfaces/create.interface";
import {
	stockLocationCreateSchema,
	type IStockLocationCreateDto,
} from "../../domain/dtos/stock-location-create.dto";
import { stockLocationService } from "../../infrastructure/stock-location.service";

export const StockLocationCreate = ({
	open,
	onClose,
	onSuccess,
}: ICreateProps) => {
	const [form] = Form.useForm();

	const handleCreate = async (dto: IStockLocationCreateDto) => {
		return stockLocationService.create(dto);
	};

	const { saving, handleSubmit } = useFormSubmit<IStockLocationCreateDto>(
		handleCreate,
		() => {
			onSuccess?.();
			onClose();
		},
	);

	return (
		<AppModal
			title="Criar Local de Estoque"
			open={open}
			onCancel={onClose}
			onOk={form.submit}
			confirmLoading={saving}>
			<Form<IStockLocationCreateDto>
				form={form}
				layout="vertical"
				onFinish={handleSubmit}
				disabled={saving}
				preserve={false}>
				<AppInput
					name="name"
					label="Nome"
					placeholder="Nome do local de estoque..."
					zodSchema={stockLocationCreateSchema.shape.name}
					maxLength={100}
				/>
				<AppInput
					name="code"
					label="Código"
					placeholder="Código do local de estoque..."
					zodSchema={stockLocationCreateSchema.shape.code}
					maxLength={50}
				/>
			</Form>
		</AppModal>
	);
};
