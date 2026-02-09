import { Col, Divider, Form, Row } from "antd";
import { AppModal } from "@/shared/components/modals/app-modal";
import { useFormSubmit } from "@/shared/hooks/use-form-submit";
import type { ICreateProps } from "@/shared/domain/interfaces/create.interface";
import { AppDateInput } from "@/shared/components/inputs/app-date-input";
import { AppSelect } from "@/shared/components/selects/app-select";
import { AppStockLocationSelect } from "@/shared/components/selects/stock-location/app-stock-location-select";
import { AppItemSelect } from "@/shared/components/selects/item/app-item-select";
import { AppBatchSelect } from "@/shared/components/selects/batch/app-batch-select";
import { AppInputNumber } from "@/shared/components/inputs/app-input-number";
import { AppFormList } from "@/shared/components/form/app-form-list";
import { BatchCreate } from "@/modules/batch/presentation/components/batch-create";
import { AppButton } from "@/shared/components/buttons/app-button";
import { useModals } from "@/shared/hooks/use-modals";
import type { ICreateTransferRequestRequestDto } from "../../domain/dtos/create-transfer-request-request.dto";
import { transferRequestService } from "../../infrastructure/transfer-request.service";
import {
	reasonConfig,
	transferRequestCreateSchema,
} from "../../domain/dtos/transfer-request-create.dto";
import { transferRequestItemCreateSchema } from "../../domain/dtos/transfer-request-item-create.dto";

export const TransferRequestCreate = ({
	open,
	onClose,
	onSuccess,
}: ICreateProps) => {
	const [form] = Form.useForm();
	const modals = useModals<string>();

	const handleCreate = async (formData: any) => {
		const { items, ...transferData } = formData;

		const payload: ICreateTransferRequestRequestDto = {
			transferRequest: transferData,
			items: items,
		};

		return transferRequestService.create(payload);
	};

	const { saving, handleSubmit } =
		useFormSubmit<ICreateTransferRequestRequestDto>(handleCreate, () => {
			onSuccess?.();
			onClose();
		});

	return (
		<AppModal
			title="Criar Solicitação de Transferência"
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
			<Form<ICreateTransferRequestRequestDto>
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
							zodSchema={transferRequestCreateSchema.shape.origin}
						/>
					</Col>
					<Col xs={24} md={12}>
						<AppStockLocationSelect
							name="destination"
							label="Destino"
							zodSchema={transferRequestCreateSchema.shape.destination}
						/>
					</Col>
					<Col xs={24} md={8}>
						<AppDateInput
							name="requestDate"
							label="Data da Requisição"
							zodSchema={transferRequestCreateSchema.shape.requestDate}
						/>
					</Col>
					<Col xs={24} md={8}>
						<AppSelect
							name="reason"
							label="Razão"
							placeholder="Selecione..."
							zodSchema={transferRequestCreateSchema.shape.reason}
							options={reasonConfig.options}
						/>
					</Col>
				</Row>
				<Divider />
				<AppFormList
					name="items"
					label="Itens da Solicitação"
					addButtonLabel="Adicionar novo item"
					minItems={1}
					renderItem={(field) => (
						<Row gutter={12}>
							<Col xs={24} md={12}>
								<AppItemSelect
									name={[field.name, "item"]}
									label="Item"
									placeholder="Selecione o item..."
									zodSchema={transferRequestItemCreateSchema.shape.item}
								/>
							</Col>
							<Col xs={24} md={12}>
								<AppBatchSelect
									name={[field.name, "batch"]}
									label="Lote"
									placeholder="Selecione o lote..."
									zodSchema={transferRequestItemCreateSchema.shape.batch}
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
									zodSchema={transferRequestItemCreateSchema.shape.quantity}
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
