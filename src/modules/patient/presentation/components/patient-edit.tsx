import { Form } from "antd";
import { AppModal } from "@/shared/components/modals/app-modal";

import { AppInput } from "@/shared/components/inputs/app-input";
import { useFormFetch } from "@/shared/hooks/use-form-fetch";
import { useFormSubmit } from "@/shared/hooks/use-form-submit";
import type { IEditProps } from "@/shared/domain/interfaces/edit.interface";
import type { IPatientListData } from "../../domain/dtos/patient-list-response.dto";
import { patientService } from "../../infrastructure/patient.service";
import {
	patientUpdateSchema,
	type IPatientUpdateDto,
} from "../../domain/dtos/patient-update.dto";
import { formatCpf } from "@/shared/utils/cpf.util";

export const PatientEdit = ({ open, onClose, uuid, onSuccess }: IEditProps) => {
	const [form] = Form.useForm();
	const { loading: fetching } = useFormFetch<IPatientListData, any>(
		uuid,
		open,
		patientService.findOne,
		form,
		(data) => ({
			...data,
			document: data?.document ? formatCpf(data.document) : data?.document,
		}),
		onClose,
	);

	const handleUpdate = async (dto: IPatientUpdateDto) => {
		if (!uuid) throw new Error("UUID não fornecido");
		return patientService.update(uuid, dto);
	};

	const { saving, handleSubmit } = useFormSubmit<IPatientUpdateDto>(
		handleUpdate,
		() => {
			onSuccess?.();
			onClose();
		},
	);

	return (
		<AppModal
			title="Editar Paciente"
			open={open}
			onCancel={onClose}
			onOk={form.submit}
			confirmLoading={saving}
			loading={fetching}>
			<Form<IPatientUpdateDto>
				form={form}
				layout="vertical"
				onFinish={handleSubmit}
				disabled={saving}
				preserve={false}>
				<AppInput
					name="name"
					label="Nome Completo"
					placeholder="Nome completo do paciente..."
					zodSchema={patientUpdateSchema.shape.name}
					maxLength={150}
				/>
				<AppInput
					name="document"
					label="CPF"
					placeholder="000.000.000-00"
					zodSchema={patientUpdateSchema.shape.document}
					maxLength={14}
					formatValueFromEvent={formatCpf}
				/>
			</Form>
		</AppModal>
	);
};
