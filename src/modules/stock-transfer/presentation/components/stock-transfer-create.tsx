import { Col, Divider, Form, Row } from "antd";
import { AppModal } from "@/shared/components/modals/app-modal";
import { useFormSubmit } from "@/shared/hooks/use-form-submit";
import type { ICreateProps } from "@/shared/domain/interfaces/create.interface";
import { AppStockLocationSelect } from "@/shared/components/selects/stock-location/app-stock-location-select";
import { AppItemSelect } from "@/shared/components/selects/item/app-item-select";
import { AppBatchSelect } from "@/shared/components/selects/batch/app-batch-select";
import { AppInputNumber } from "@/shared/components/inputs/app-input-number";
import { AppFormList } from "@/shared/components/form/app-form-list";
import { BatchCreate } from "@/modules/batch/presentation/components/batch-create";
import { AppButton } from "@/shared/components/buttons/app-button";
import { useModals } from "@/shared/hooks/use-modals";
import type { ICreateStockTransferRequestDto } from "../../domain/dtos/create-stock-transfer-request.dto";
import { stockTransferService } from "../../infrastructure/stock-transfer.service";
import { stockTransferCreateSchema } from "../../domain/dtos/stock-transfer-create.dto";
import { stockTransferItemCreateSchema } from "../../domain/dtos/stock-transfer-item-create.dto";
import { AppDateInput } from "@/shared/components/inputs/app-date-input";

export const StockTransferCreate = ({
	open,
	onClose,
	onSuccess,
}: ICreateProps) => {
	const [form] = Form.useForm();
	const modals = useModals<string>();

	const handleCreate = async (formData: any) => {
		const { items, ...transfer } = formData;

		const payload: ICreateStockTransferRequestDto = {
			transfer: transfer,
			items: items,
		};

		return stockTransferService.create(payload);
	};

	const { saving, handleSubmit } =
		useFormSubmit<ICreateStockTransferRequestDto>(handleCreate, () => {
			onSuccess?.();
			onClose();
		});

	return (
		<AppModal
			title="Criar Transferência de Estoque"
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
			<Form<ICreateStockTransferRequestDto>
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
						<AppStockLocationSelect
							name="origin"
							label="Origem"
							zodSchema={stockTransferCreateSchema.shape.origin}
						/>
					</Col>
					<Col xs={24} md={12}>
						<AppStockLocationSelect
							name="destination"
							label="Destino"
							zodSchema={stockTransferCreateSchema.shape.destination}
						/>
					</Col>
					<Col xs={24} md={8}>
						<AppDateInput
							name="transferDate"
							label="Data de Transferência"
							zodSchema={stockTransferCreateSchema.shape.transferDate}
						/>
					</Col>
				</Row>
				<Divider />
				<AppFormList
					name="items"
					label="Itens da Transferência"
					addButtonLabel="Adicionar novo item"
					minItems={1}
					renderItem={(field) => (
						<Row gutter={12}>
							<Col xs={24} md={12}>
								<AppItemSelect
									name={[field.name, "item"]}
									label="Item"
									placeholder="Selecione o item..."
									zodSchema={stockTransferItemCreateSchema.shape.item}
								/>
							</Col>
							<Col xs={24} md={12}>
								<AppBatchSelect
									name={[field.name, "batch"]}
									label="Lote"
									placeholder="Selecione o lote..."
									zodSchema={stockTransferItemCreateSchema.shape.batch}
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
									zodSchema={stockTransferItemCreateSchema.shape.quantity}
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
