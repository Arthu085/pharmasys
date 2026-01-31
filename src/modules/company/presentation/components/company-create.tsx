import { Form } from "antd";
import { AppModal } from "@/shared/components/modals/app-modal";
import { AppInput } from "@/shared/components/inputs/app-input";
import type { ICompanyCreateProps } from "../../domain/interfaces/company-create.interface";
import {
	companyCreateSchema,
	createCompanyTypeOptions,
	type ICompanyCreateDto,
} from "../../domain/dtos/company-create.dto";
import { AppSelect } from "@/shared/components/selects/app-select";
import { useFormSubmit } from "@/shared/hooks/use-form-submit";
import { companyService } from "../../infrastructure/company.service";
import { formatCnpj } from "@/shared/utils/cnpj.util";

export const CompanyCreate = ({
	open,
	onClose,
	onSuccess,
}: ICompanyCreateProps) => {
	const [form] = Form.useForm();
	const { saving, handleSubmit } = useFormSubmit<ICompanyCreateDto>(
		companyService.create,
		() => {
			onSuccess?.();
			onClose();
		},
	);

	return (
		<AppModal
			title="Criar Empresa"
			open={open}
			onCancel={onClose}
			onOk={form.submit}
			confirmLoading={saving}>
			<Form<ICompanyCreateDto>
				form={form}
				layout="vertical"
				onFinish={handleSubmit}
				disabled={saving}
				preserve={false}>
				<AppInput
					name="name"
					label="Nome da Empresa"
					placeholder="Nome da empresa..."
					zodSchema={companyCreateSchema.shape.name}
					maxLength={255}
				/>
				<AppInput
					name="cnpj"
					label="CNPJ"
					placeholder="00.000.000/0000-00"
					zodSchema={companyCreateSchema.shape.cnpj}
					maxLength={18}
					formatValueFromEvent={formatCnpj}
				/>
				<AppSelect
					name="companyTypes"
					label="Tipo de Empresa"
					placeholder="Selecione um tipo de empresa"
					mode="multiple"
					options={createCompanyTypeOptions}
					zodSchema={companyCreateSchema.shape.companyTypes}
				/>
			</Form>
		</AppModal>
	);
};
