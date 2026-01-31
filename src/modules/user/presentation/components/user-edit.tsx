import { userService } from "../../infrastructure/user.service";
import { Form } from "antd";
import { AppModal } from "@/shared/components/modals/app-modal";
import {
	userUpdateSchema,
	type IUserUpdateDto,
} from "../../domain/dtos/user-update.dto";
import type { IUserEditProps } from "../../domain/interfaces/user-edit.interface";
import { AppInput } from "@/shared/components/inputs/app-input";
import { AppPasswordInput } from "@/shared/components/inputs/app-password-input";
import { AppSelect } from "@/shared/components/selects/app-select";
import { createRoleOptions } from "../../domain/dtos/user-create.dto";
import { useFormFetch } from "@/shared/hooks/use-form-fetch";
import { useFormSubmit } from "@/shared/hooks/use-form-submit";
import type { IUserListData } from "../../domain/dtos/user-list-response.dto";

export const UserEdit = ({
	open,
	onClose,
	uuid,
	onSuccess,
}: IUserEditProps) => {
	const [form] = Form.useForm();
	const { loading: fetching } = useFormFetch<IUserListData, any>(
		uuid,
		open,
		userService.findOne,
		form,
		(data) => ({
			...data,
			role: data.role.value,
			password: undefined,
		}),
		onClose,
	);

	const handleUpdate = async (dto: IUserUpdateDto) => {
		if (!uuid) throw new Error("UUID não fornecido");
		return userService.update(uuid, dto);
	};

	const { saving, handleSubmit } = useFormSubmit<IUserUpdateDto>(
		handleUpdate,
		() => {
			onSuccess?.();
			onClose();
		},
	);

	return (
		<AppModal
			title="Editar Usuário"
			open={open}
			onCancel={onClose}
			onOk={form.submit}
			confirmLoading={saving}
			loading={fetching}>
			<Form<IUserUpdateDto>
				form={form}
				layout="vertical"
				onFinish={handleSubmit}
				disabled={saving}
				preserve={false}>
				<AppInput
					name="name"
					label="Nome Completo"
					zodSchema={userUpdateSchema.shape.name}
				/>
				<AppInput
					name="email"
					label="E-mail"
					zodSchema={userUpdateSchema.shape.email}
				/>
				<AppPasswordInput
					name="password"
					label="Senha"
					placeholder="*********"
					zodSchema={userUpdateSchema.shape.password}
				/>
				<AppSelect
					name="role"
					label="Função"
					placeholder="Selecione uma função"
					options={createRoleOptions}
					zodSchema={userUpdateSchema.shape.role}
				/>
			</Form>
		</AppModal>
	);
};
