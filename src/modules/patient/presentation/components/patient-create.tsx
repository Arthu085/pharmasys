import { Form } from "antd";
import { AppModal } from "@/shared/components/modals/app-modal";
import { AppInput } from "@/shared/components/inputs/app-input";
import { useFormSubmit } from "@/shared/hooks/use-form-submit";
import type { ICreateProps } from "@/shared/domain/interfaces/create.interface";
import {
	patientCreateSchema,
	type IPatientCreateDto,
} from "../../domain/dtos/patient-create.dto";
import { patientService } from "../../infrastructure/patient.service";
import { formatCpf } from "@/shared/utils/cpf.util";

export const PatientCreate = ({ open, onClose, onSuccess }: ICreateProps) => {
	const [form] = Form.useForm();

	const handleCreate = async (dto: IPatientCreateDto) => {
		return patientService.create(dto);
	};

	const { saving, handleSubmit } = useFormSubmit<IPatientCreateDto>(
		handleCreate,
		() => {
			onSuccess?.();
			onClose();
		},
	);

	return (
		<AppModal
			title="Criar Paciente"
			open={open}
			onCancel={onClose}
			onOk={form.submit}
			confirmLoading={saving}>
			<Form<IPatientCreateDto>
				form={form}
				layout="vertical"
				onFinish={handleSubmit}
				disabled={saving}
				preserve={false}>
				<AppInput
					name="name"
					label="Nome Completo"
					placeholder="Nome completo do paciente..."
					zodSchema={patientCreateSchema.shape.name}
					maxLength={150}
				/>
				<AppInput
					name="document"
					label="CPF"
					placeholder="000.000.000-00"
					zodSchema={patientCreateSchema.shape.document}
					maxLength={14}
					formatValueFromEvent={formatCpf}
				/>
			</Form>
		</AppModal>
	);
};
