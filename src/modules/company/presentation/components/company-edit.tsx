import { Form } from "antd";
import { AppModal } from "@/shared/components/modals/app-modal";
import {
	companyUpdateSchema,
	type ICompanyUpdateDto,
} from "../../domain/dtos/company-update.dto";
import { AppInput } from "@/shared/components/inputs/app-input";
import { AppSelect } from "@/shared/components/selects/app-select";
import { useFormFetch } from "@/shared/hooks/use-form-fetch";
import { useFormSubmit } from "@/shared/hooks/use-form-submit";
import type { ICompanyEditProps } from "../../domain/interfaces/company-edit.interface";
import type { ICompanyListData } from "../../domain/dtos/company-list-response.dto";
import { companyService } from "../../infrastructure/company.service";
import { createCompanyTypeOptions } from "../../domain/dtos/company-create.dto";
import { formatCnpj } from "@/shared/utils/cnpj.util";

export const CompanyEdit = ({
	open,
	onClose,
	uuid,
	onSuccess,
}: ICompanyEditProps) => {
	const [form] = Form.useForm();
	const { loading: fetching } = useFormFetch<ICompanyListData, any>(
		uuid,
		open,
		companyService.findOne,
		form,
		(data) => ({
			...data,
			companyTypes: data.companyTypes.map((type) => type.value),
		}),
		onClose,
	);

	const handleUpdate = async (dto: ICompanyUpdateDto) => {
		if (!uuid) throw new Error("UUID não fornecido");
		return companyService.update(uuid, dto);
	};

	const { saving, handleSubmit } = useFormSubmit<ICompanyUpdateDto>(
		handleUpdate,
		() => {
			onSuccess?.();
			onClose();
		},
	);

	return (
		<AppModal
			title="Editar Empresa"
			open={open}
			onCancel={onClose}
			onOk={form.submit}
			confirmLoading={saving}
			loading={fetching}>
			<Form<ICompanyUpdateDto>
				form={form}
				layout="vertical"
				onFinish={handleSubmit}
				disabled={saving}
				preserve={false}>
				<AppInput
					name="name"
					label="Nome da Empresa"
					placeholder="Nome da empresa..."
					zodSchema={companyUpdateSchema.shape.name}
					maxLength={255}
				/>
				<AppInput
					name="cnpj"
					label="CNPJ"
					placeholder="00.000.000/0000-00"
					zodSchema={companyUpdateSchema.shape.cnpj}
					maxLength={18}
					formatValueFromEvent={formatCnpj}
				/>
				<AppSelect
					name="companyTypes"
					label="Tipo de Empresa"
					placeholder="Selecione um tipo de empresa"
					mode="multiple"
					options={createCompanyTypeOptions}
					zodSchema={companyUpdateSchema.shape.companyTypes}
				/>
			</Form>
		</AppModal>
	);
};
