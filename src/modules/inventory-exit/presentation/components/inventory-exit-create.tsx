import { Col, Divider, Form, Row } from "antd";
import { AppModal } from "@/shared/components/modals/app-modal";
import { AppTextArea } from "@/shared/components/inputs/app-text-area";
import { useFormSubmit } from "@/shared/hooks/use-form-submit";
import type { ICreateProps } from "@/shared/domain/interfaces/create.interface";
import type { ICreateInventoryExitRequestDto } from "../../domain/dtos/create-inventory-exit-request.dto";
import {
	exitTypeConfig,
	inventoryExitCreateSchema,
} from "../../domain/dtos/inventory-exit-create.dto";
import { AppDateInput } from "@/shared/components/inputs/app-date-input";
import { AppSelect } from "@/shared/components/selects/app-select";
import { AppStockLocationSelect } from "@/shared/components/selects/stock-location/app-stock-location-select";
import { AppItemSelect } from "@/shared/components/selects/item/app-item-select";
import { inventoryExitItemCreateSchema } from "../../domain/dtos/inventory-exit-item-create.dto";
import { AppBatchSelect } from "@/shared/components/selects/batch/app-batch-select";
import { AppInputNumber } from "@/shared/components/inputs/app-input-number";
import { AppFormList } from "@/shared/components/form/app-form-list";
import { BatchCreate } from "@/modules/batch/presentation/components/batch-create";
import { AppButton } from "@/shared/components/buttons/app-button";
import { inventoryExitService } from "../../infrastructure/inventory-exit.service";
import { useModals } from "@/shared/hooks/use-modals";

export const InventoryExitCreate = ({
	open,
	onClose,
	onSuccess,
}: ICreateProps) => {
	const [form] = Form.useForm();
	const modals = useModals<string>();

	const handleCreate = async (formData: any) => {
		const { items, ...exitData } = formData;

		const payload: ICreateInventoryExitRequestDto = {
			exit: exitData,
			items: items,
		};

		return inventoryExitService.create(payload);
	};

	const { saving, handleSubmit } =
		useFormSubmit<ICreateInventoryExitRequestDto>(handleCreate, () => {
			onSuccess?.();
			onClose();
		});

	return (
		<AppModal
			title="Criar Saída de Estoque"
			open={open}
			onCancel={onClose}
			onOk={form.submit}
			confirmLoading={saving}
			width={800}>
			<BatchCreate
				open={modals.isCreateOpen}
				onClose={modals.closeCreate}
				onSuccess={modals.closeCreate}
			/>
			<Form<ICreateInventoryExitRequestDto>
				form={form}
				layout="vertical"
				onFinish={handleSubmit}
				disabled={saving}
				preserve={false}
				initialValues={{
					items: [{}],
				}}>
				<Row gutter={16}>
					<Col xs={24} md={16}>
						<AppStockLocationSelect
							name="stockLocation"
							label="Local de Estoque"
							zodSchema={inventoryExitCreateSchema.shape.stockLocation}
						/>
					</Col>
					<Col xs={24} md={8}>
						<AppDateInput
							name="exitDate"
							label="Data de Saída"
							zodSchema={inventoryExitCreateSchema.shape.exitDate}
						/>
					</Col>
					<Col xs={24} md={12}>
						<AppSelect
							name="exitType"
							label="Tipo de Saída"
							placeholder="Selecione..."
							zodSchema={inventoryExitCreateSchema.shape.exitType}
							options={exitTypeConfig.options}
						/>
					</Col>
					<Col xs={24} md={12}>
						<AppTextArea
							name="notes"
							label="Notas"
							placeholder="Notas da saída..."
							zodSchema={inventoryExitCreateSchema.shape.notes}
							maxLength={500}
						/>
					</Col>
				</Row>
				<Divider />
				<AppFormList
					name="items"
					label="Itens da Saída"
					addButtonLabel="Adicionar novo item"
					minItems={1}
					renderItem={(field) => (
						<Row gutter={12}>
							<Col xs={24} md={12}>
								<AppItemSelect
									name={[field.name, "item"]}
									label="Item"
									placeholder="Selecione o item..."
									zodSchema={inventoryExitItemCreateSchema.shape.item}
								/>
							</Col>
							<Col xs={24} md={12}>
								<AppBatchSelect
									name={[field.name, "batch"]}
									label="Lote"
									placeholder="Selecione o lote..."
									zodSchema={inventoryExitItemCreateSchema.shape.batch}
									extra={
										<AppButton
											type="link"
											style={{ padding: 0 }}
											onClick={() => modals.openCreate()}>
											Cadastrar lote
										</AppButton>
									}
								/>
							</Col>
							<Col xs={24} md={6}>
								<AppInputNumber
									name={[field.name, "quantity"]}
									label="Qtd"
									zodSchema={inventoryExitItemCreateSchema.shape.quantity}
									min={0}
									precision={0}
									placeholder="0"
								/>
							</Col>
						</Row>
					)}
				/>
			</Form>
		</AppModal>
	);
};
