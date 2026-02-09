import { Col, Divider, Form, Row } from "antd";
import { AppModal } from "@/shared/components/modals/app-modal";
import type { ICreateProps } from "@/shared/domain/interfaces/create.interface";
import type { ICreateItemDispensationRequestDto } from "../../domain/dtos/create-item-dispensation-request.dto";
import { itemDispensationCreateSchema } from "../../domain/dtos/item-dispensation-create.dto";
import { AppDateInput } from "@/shared/components/inputs/app-date-input";
import { AppStockLocationSelect } from "@/shared/components/selects/stock-location/app-stock-location-select";
import { AppItemSelect } from "@/shared/components/selects/item/app-item-select";
import { itemDispensationItemCreateSchema } from "../../domain/dtos/item-dispensation-item-create.dto";
import { AppBatchSelect } from "@/shared/components/selects/batch/app-batch-select";
import { AppInputNumber } from "@/shared/components/inputs/app-input-number";
import { AppFormList } from "@/shared/components/form/app-form-list";
import { BatchCreate } from "@/modules/batch/presentation/components/batch-create";
import { AppButton } from "@/shared/components/buttons/app-button";
import { itemDispensationService } from "../../infrastructure/item-dispensation.service";
import { AppPatientSelect } from "@/shared/components/selects/patient/app-patient-select";
import { AppPrescriptorSelect } from "@/shared/components/selects/prescriptor/app-prescriptor-select";
import { AppInput } from "@/shared/components/inputs/app-input";
import { useFormSubmit } from "@/shared/hooks/use-form-submit";
import { AppCheckbox } from "@/shared/components/inputs/app-checkbox";
import { useModals } from "@/shared/hooks/use-modals";

export const ItemDispensationCreate = ({
	open,
	onClose,
	onSuccess,
}: ICreateProps) => {
	const [form] = Form.useForm();
	const modals = useModals<string>();

	const handleCreate = async (formData: any) => {
		const { items, ...dispensationData } = formData;

		const payload: ICreateItemDispensationRequestDto = {
			dispensation: dispensationData,
			items: items,
		};

		return itemDispensationService.create(payload);
	};

	const { saving, handleSubmit } =
		useFormSubmit<ICreateItemDispensationRequestDto>(handleCreate, () => {
			onSuccess?.();
			onClose();
		});

	return (
		<AppModal
			title="Criar Dispensação de Item"
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
			<Form<ICreateItemDispensationRequestDto>
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
						<AppPatientSelect
							name="patient"
							label="Paciente"
							zodSchema={itemDispensationCreateSchema.shape.patient}
						/>
					</Col>
					<Col xs={24} md={12}>
						<AppPrescriptorSelect
							name="prescriptor"
							label="Prescriptor"
							zodSchema={itemDispensationCreateSchema.shape.prescriptor}
						/>
					</Col>
					<Col xs={24} md={14}>
						<AppStockLocationSelect
							name="stockLocation"
							label="Local de Estoque"
							zodSchema={itemDispensationCreateSchema.shape.stockLocation}
						/>
					</Col>
					<Col xs={24} md={10}>
						<AppDateInput
							name="dispensationDate"
							label="Data de Dispensação"
							zodSchema={itemDispensationCreateSchema.shape.dispensationDate}
						/>
					</Col>
				</Row>
				<Divider />
				<AppFormList
					name="items"
					label="Itens da Dispensação"
					addButtonLabel="Adicionar novo item"
					minItems={1}
					renderItem={(field) => (
						<Row gutter={12}>
							<Col xs={24} md={12}>
								<AppItemSelect
									name={[field.name, "item"]}
									label="Item"
									placeholder="Selecione o item..."
									zodSchema={itemDispensationItemCreateSchema.shape.item}
								/>
							</Col>
							<Col xs={24} md={12}>
								<AppBatchSelect
									name={[field.name, "batch"]}
									label="Lote"
									placeholder="Selecione o lote..."
									zodSchema={itemDispensationItemCreateSchema.shape.batch}
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
									zodSchema={itemDispensationItemCreateSchema.shape.quantity}
									min={0}
									precision={0}
									placeholder="0"
								/>
							</Col>
							<Col xs={24} md={18}>
								<AppInput
									name={[field.name, "prescriptionNotificationNumber"]}
									label="Número de Notificação da Prescrição"
									zodSchema={
										itemDispensationItemCreateSchema.shape
											.prescriptionNotificationNumber
									}
									maxLength={50}
									extra={
										<AppCheckbox
											name={[field.name, "isPsychotropic"]}
											label="Psicotrópico?"
											zodSchema={
												itemDispensationItemCreateSchema.shape.isPsychotropic
											}
										/>
									}
								/>
							</Col>
						</Row>
					)}
				/>
			</Form>
		</AppModal>
	);
};
