import { userService } from "../../infrastructure/user.service";
import { Form } from "antd";
import { AppModal } from "@/shared/components/modals/app-modal";
import { AppInput } from "@/shared/components/inputs/app-input";
import type { IUserCreateProps } from "../../domain/interfaces/user-create.interface";
import {
	createRoleOptions,
	userCreateSchema,
	type IUserCreateDto,
} from "../../domain/dtos/user-create.dto";
import { AppPasswordInput } from "@/shared/components/inputs/app-password-input";
import { AppSelect } from "@/shared/components/selects/app-select";
import { useFormSubmit } from "@/shared/hooks/use-form-submit";

export const UserCreate = ({ open, onClose, onSuccess }: IUserCreateProps) => {
	const [form] = Form.useForm();
	const { saving, handleSubmit } = useFormSubmit<IUserCreateDto>(
		userService.create,
		() => {
			onSuccess?.();
			onClose();
		},
	);

	return (
		<AppModal
			title="Criar Usuário"
			open={open}
			onCancel={onClose}
			onOk={form.submit}
			confirmLoading={saving}>
			<Form<IUserCreateDto>
				form={form}
				layout="vertical"
				onFinish={handleSubmit}
				disabled={saving}
				preserve={false}>
				<AppInput
					name="name"
					label="Nome Completo"
					placeholder="Seu nome completo..."
					zodSchema={userCreateSchema.shape.name}
				/>
				<AppInput
					name="email"
					label="E-mail"
					placeholder="Seu e-mail..."
					zodSchema={userCreateSchema.shape.email}
				/>
				<AppPasswordInput
					name="password"
					label="Senha"
					placeholder="*********"
					zodSchema={userCreateSchema.shape.password}
				/>
				<AppSelect
					name="role"
					label="Função"
					placeholder="Selecione uma função"
					options={createRoleOptions}
					zodSchema={userCreateSchema.shape.role}
				/>
			</Form>
		</AppModal>
	);
};
