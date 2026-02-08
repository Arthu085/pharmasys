import { Col, Divider, Form, Row } from "antd";
import { AppModal } from "@/shared/components/modals/app-modal";
import { AppInput } from "@/shared/components/inputs/app-input";
import { useFormSubmit } from "@/shared/hooks/use-form-submit";
import type { ICreateProps } from "@/shared/domain/interfaces/create.interface";
import type { ICreateInventoryEntryRequestDto } from "../../domain/dtos/create-inventory-entry-request.dto";
import { inventoryEntryService } from "../../infrastructure/inventory-entry.service";
import {
	entryTypeConfig,
	inventoryEntryCreateSchema,
} from "../../domain/dtos/inventory-entry-create.dto";
import { AppDateInput } from "@/shared/components/inputs/app-date-input";
import { AppSelect } from "@/shared/components/selects/app-select";
import { AppStockLocationSelect } from "@/shared/components/selects/stock-location/app-stock-location-select";
import { AppItemSelect } from "@/shared/components/selects/item/app-item-select";
import { inventoryEntryItemCreateSchema } from "../../domain/dtos/inventory-entry-item-create.dto";
import { AppBatchSelect } from "@/shared/components/selects/batch/app-batch-select";
import { AppInputNumber } from "@/shared/components/inputs/app-input-number";
import { AppFormList } from "@/shared/components/form/app-form-list";
import { BatchCreate } from "@/modules/batch/presentation/components/batch-create";
import { AppButton } from "@/shared/components/buttons/app-button";
import { useModals } from "@/shared/hooks/use-modals";

export const InventoryEntryCreate = ({
	open,
	onClose,
	onSuccess,
}: ICreateProps) => {
	const [form] = Form.useForm();
	const modals = useModals<string>();

	const handleCreate = async (formData: any) => {
		const { items, ...entryData } = formData;

		const payload: ICreateInventoryEntryRequestDto = {
			entry: entryData,
			items: items,
		};

		return inventoryEntryService.create(payload);
	};

	const { saving, handleSubmit } =
		useFormSubmit<ICreateInventoryEntryRequestDto>(handleCreate, () => {
			onSuccess?.();
			onClose();
		});

	return (
		<AppModal
			title="Criar Entrada de Estoque"
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
			<Form<ICreateInventoryEntryRequestDto>
				form={form}
				layout="vertical"
				onFinish={handleSubmit}
				disabled={saving}
				preserve={false}
				initialValues={{
					items: [{}],
				}}>
				<Row gutter={16}>
					<Col xs={24} md={12}>
						<AppInput
							name="invoiceNumber"
							label="Nota Fiscal"
							placeholder="Ex: 123456"
							zodSchema={inventoryEntryCreateSchema.shape.invoiceNumber}
							maxLength={70}
						/>
					</Col>
					<Col xs={24} md={12}>
						<AppStockLocationSelect
							name="stockLocation"
							label="Local de Estoque"
							zodSchema={inventoryEntryCreateSchema.shape.stockLocation}
						/>
					</Col>
					<Col xs={24} md={8}>
						<AppDateInput
							name="entryDate"
							label="Data de Entrada"
							zodSchema={inventoryEntryCreateSchema.shape.entryDate}
						/>
					</Col>
					<Col xs={24} md={8}>
						<AppSelect
							name="entryType"
							label="Tipo de Entrada"
							placeholder="Selecione..."
							zodSchema={inventoryEntryCreateSchema.shape.entryType}
							options={entryTypeConfig.options}
						/>
					</Col>
					<Col xs={24} md={8}>
						<AppInputNumber
							name="totalValue"
							label="Valor Total"
							placeholder="0.00"
							zodSchema={inventoryEntryCreateSchema.shape.totalValue}
							precision={2}
							prefix="R$"
						/>
					</Col>
				</Row>
				<Divider />
				<AppFormList
					name="items"
					label="Itens da Entrada"
					addButtonLabel="Adicionar novo item"
					minItems={1}
					renderItem={(field) => (
						<Row gutter={12}>
							<Col xs={24} md={12}>
								<AppItemSelect
									name={[field.name, "item"]}
									label="Item"
									placeholder="Selecione o item..."
									zodSchema={inventoryEntryItemCreateSchema.shape.item}
								/>
							</Col>
							<Col xs={24} md={12}>
								<AppBatchSelect
									name={[field.name, "batch"]}
									label="Lote"
									placeholder="Selecione o lote..."
									zodSchema={inventoryEntryItemCreateSchema.shape.batch}
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
									zodSchema={inventoryEntryItemCreateSchema.shape.quantity}
									min={0}
									precision={0}
									placeholder="0"
								/>
							</Col>
							<Col xs={24} md={6}>
								<AppInputNumber
									name={[field.name, "unitPrice"]}
									label="Preço Unit."
									zodSchema={inventoryEntryItemCreateSchema.shape.unitPrice}
									min={0}
									precision={2}
									placeholder="0.00"
									prefix="R$"
								/>
							</Col>
						</Row>
					)}
				/>
			</Form>
		</AppModal>
	);
};
