import { Col, Form, Input, Row } from "antd";
import { AppModal } from "@/shared/components/modals/app-modal";
import { useFormSubmit } from "@/shared/hooks/use-form-submit";
import type { IEditProps } from "@/shared/domain/interfaces/edit.interface";
import type { ITransferRequestListData } from "../../domain/dtos/transfer-request-list-response.dto";
import { transferRequestService } from "../../infrastructure/transfer-request.service";
import { useFormFetch } from "@/shared/hooks/use-form-fetch";
import {
	transferRequestItemUpdateSchema,
	type ITransferRequestItemUpdateDto,
} from "../../domain/dtos/transfer-request-item-update.dto";
import { BatchCreate } from "@/modules/batch/presentation/components/batch-create";
import { useModals } from "@/shared/hooks/use-modals";
import { AppFormList } from "@/shared/components/form/app-form-list";
import { AppItemSelect } from "@/shared/components/selects/item/app-item-select";
import { AppBatchSelect } from "@/shared/components/selects/batch/app-batch-select";
import { AppButton } from "@/shared/components/buttons/app-button";
import { AppInputNumber } from "@/shared/components/inputs/app-input-number";
import { useSelectOptions } from "@/shared/hooks/use-select-options";

export const TransferRequestItemEdit = ({
	open,
	onClose,
	uuid,
	onSuccess,
}: IEditProps) => {
	const [form] = Form.useForm<ITransferRequestItemUpdateDto>();
	const modals = useModals<string>();
	const { optionsMap, loadOption } = useSelectOptions();

	const { loading: fetching } = useFormFetch<ITransferRequestListData, any>(
		uuid,
		open,
		transferRequestService.findOne,
		form,
		(data) => ({
			...data,
			items: data.items.map((item) => ({
				...item,
				uuid: item.uuid,
				item: loadOption("item", item.item),
				batch: loadOption("batch", item.batch),
			})),
		}),
		onClose,
	);

	const handleUpdate = async (dto: ITransferRequestItemUpdateDto) => {
		if (!uuid) throw new Error("UUID não fornecido");
		return transferRequestService.updateItem(uuid, dto);
	};

	const { saving, handleSubmit } = useFormSubmit<ITransferRequestItemUpdateDto>(
		handleUpdate,
		() => {
			onSuccess?.();
			onClose();
		},
	);

	return (
		<AppModal
			title="Editar Itens da Requisição de Transferência"
			open={open}
			onCancel={onClose}
			onOk={form.submit}
			confirmLoading={saving}
			loading={fetching}
			width={800}>
			<BatchCreate
				open={modals.isCreateOpen}
				onClose={modals.closeCreate}
				onSuccess={modals.closeCreate}
			/>
			<Form<ITransferRequestItemUpdateDto>
				form={form}
				layout="vertical"
				onFinish={handleSubmit}
				disabled={saving}
				preserve={false}
				initialValues={{
					items: [{}],
				}}>
				<AppFormList
					name="items"
					label="Itens da Solicitação"
					addButtonLabel="Adicionar novo item"
					minItems={1}
					renderItem={(field) => (
						<Row gutter={12}>
							<Form.Item name={[field.name, "uuid"]} hidden>
								<Input />
							</Form.Item>
							<Col xs={24} md={12}>
								<AppItemSelect
									name={[field.name, "item"]}
									label="Item"
									placeholder="Selecione o item..."
									zodSchema={
										transferRequestItemUpdateSchema.shape.items.element.shape
											.item
									}
									options={optionsMap.item}
								/>
							</Col>
							<Col xs={24} md={12}>
								<AppBatchSelect
									name={[field.name, "batch"]}
									label="Lote"
									placeholder="Selecione o lote..."
									zodSchema={
										transferRequestItemUpdateSchema.shape.items.element.shape
											.batch
									}
									extra={
										<AppButton
											type="link"
											style={{ padding: 0 }}
											onClick={() => modals.openCreate()}>
											Cadastrar lote
										</AppButton>
									}
									options={optionsMap.batch}
								/>
							</Col>
							<Col xs={24} md={6}>
								<AppInputNumber
									name={[field.name, "quantity"]}
									label="Qtd"
									zodSchema={
										transferRequestItemUpdateSchema.shape.items.element.shape
											.quantity
									}
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
