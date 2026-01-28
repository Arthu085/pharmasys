import { useEffect, useState } from "react";
import { userService } from "../../infrastructure/user.service";
import { Form, message, Modal } from "antd";
import { AppModal } from "@/shared/components/modals/app-modal";
import {
	userUpdateSchema,
	type IUserUpdateDto,
} from "../../domain/dtos/user-update.dto";
import type { IUserEditProps } from "../../domain/interfaces/user-edit.interface";
import { AppInput } from "@/shared/components/inputs/app-input";
import { getErrorMessage } from "@/shared/utils/api-erro.util";

export const UserEdit = ({
	open,
	onClose,
	uuid,
	onSuccess,
}: IUserEditProps) => {
	const [form] = Form.useForm();
	const [fetching, setFetching] = useState(false);
	const [saving, setSaving] = useState(false);

	useEffect(() => {
		if (open && uuid) {
			loadData(uuid);
		} else {
			form.resetFields();
		}
	}, [open, uuid]);

	const loadData = async (uuid: string) => {
		try {
			setFetching(true);
			const response = await userService.findOne(uuid);

			if (response.success && response.data) {
				form.setFieldsValue(response.data);
			} else {
				message.error({
					content: response.message || "Erro ao carregar dados",
					duration: 5,
				});
				onClose();
			}
		} catch (error) {
			const msg = getErrorMessage(error);

			Modal.error({
				title: "Erro",
				content: msg,
			});
			onClose();
		} finally {
			setFetching(false);
		}
	};

	const handleSubmit = async (values: IUserUpdateDto) => {
		if (!uuid) return;

		try {
			setSaving(true);
			const response = await userService.update(uuid, values);

			if (response.success) {
				message.success({
					content: response.message || "Usuário atualizado com sucesso",
					duration: 5,
				});
				if (onSuccess) onSuccess();
				onClose();
			} else {
				message.error({
					content: response.message || "Erro ao salvar dados",
					duration: 5,
				});
			}
		} catch (error) {
			const msg = getErrorMessage(error);

			Modal.error({
				title: "Erro",
				content: msg,
			});
		} finally {
			setSaving(false);
		}
	};

	return (
		<AppModal
			title="Editar Usuário"
			open={open}
			onCancel={onClose}
			onOk={form.submit}
			loading={saving}>
			<Form
				form={form}
				layout="vertical"
				onFinish={handleSubmit}
				disabled={fetching}>
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
			</Form>
		</AppModal>
	);
};
