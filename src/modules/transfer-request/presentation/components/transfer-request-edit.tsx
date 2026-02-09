import { Col, Form, Row } from "antd";
import { AppModal } from "@/shared/components/modals/app-modal";
import { useFormSubmit } from "@/shared/hooks/use-form-submit";
import type { IEditProps } from "@/shared/domain/interfaces/edit.interface";
import type { ITransferRequestListData } from "../../domain/dtos/transfer-request-list-response.dto";
import { transferRequestService } from "../../infrastructure/transfer-request.service";
import {
	transferRequestUpdateSchema,
	type ITransferRequestUpdateDto,
} from "../../domain/dtos/transfer-request-update.dto";
import { AppStockLocationSelect } from "@/shared/components/selects/stock-location/app-stock-location-select";
import { AppDateInput } from "@/shared/components/inputs/app-date-input";
import { AppSelect } from "@/shared/components/selects/app-select";
import { reasonConfig } from "../../domain/dtos/transfer-request-create.dto";
import { useFormFetch } from "@/shared/hooks/use-form-fetch";
import { useSelectOptions } from "@/shared/hooks/use-select-options";
import dayjs from "dayjs";

export const TransferRequestEdit = ({
	open,
	onClose,
	uuid,
	onSuccess,
}: IEditProps) => {
	const [form] = Form.useForm();
	const { optionsMap, loadOption } = useSelectOptions();

	const { loading: fetching } = useFormFetch<ITransferRequestListData, any>(
		uuid,
		open,
		transferRequestService.findOne,
		form,
		(data) => ({
			...data,
			origin: loadOption("origin", data.origin),
			destination: loadOption("destination", data.destination),
			requestDate: data.requestDate
				? dayjs(data.requestDate).toDate()
				: undefined,
			reason: data.reason?.value,
		}),
		onClose,
	);

	const handleUpdate = async (dto: ITransferRequestUpdateDto) => {
		if (!uuid) throw new Error("UUID não fornecido");
		return transferRequestService.update(uuid, dto);
	};

	const { saving, handleSubmit } = useFormSubmit<ITransferRequestUpdateDto>(
		handleUpdate,
		() => {
			onSuccess?.();
			onClose();
		},
	);

	return (
		<AppModal
			title="Editar Requisição de Transferência"
			open={open}
			onCancel={onClose}
			onOk={form.submit}
			confirmLoading={saving}
			loading={fetching}
			width={800}>
			<Form<ITransferRequestUpdateDto>
				form={form}
				layout="vertical"
				onFinish={handleSubmit}
				disabled={saving}
				preserve={false}>
				<Row gutter={16}>
					<Col xs={24} md={12}>
						<AppStockLocationSelect
							name="origin"
							label="Origem"
							zodSchema={transferRequestUpdateSchema.shape.origin}
							options={optionsMap.origin}
							showSearch
						/>
					</Col>
					<Col xs={24} md={12}>
						<AppStockLocationSelect
							name="destination"
							label="Destino"
							zodSchema={transferRequestUpdateSchema.shape.destination}
							options={optionsMap.destination}
							showSearch
						/>
					</Col>
					<Col xs={24} md={12}>
						<AppDateInput
							name="requestDate"
							label="Data da Requisição"
							zodSchema={transferRequestUpdateSchema.shape.requestDate}
						/>
					</Col>
					<Col xs={24} md={12}>
						<AppSelect
							name="reason"
							label="Motivo da Transferência"
							placeholder="Selecione..."
							zodSchema={transferRequestUpdateSchema.shape.reason}
							options={reasonConfig.options}
							showSearch={{ optionFilterProp: "label" }}
						/>
					</Col>
				</Row>
			</Form>
		</AppModal>
	);
};
