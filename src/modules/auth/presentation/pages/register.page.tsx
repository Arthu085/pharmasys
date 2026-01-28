import { useState } from "react";
import { Card, Flex, Form, Modal, Space, Typography, message } from "antd";
import {
	UserOutlined,
	LockOutlined,
	IdcardOutlined,
	SolutionOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth.hook";
import { AppInput } from "@/shared/components/inputs/app-input.tsx";
import { AppPasswordInput } from "@/shared/components/inputs/app-password-input.tsx";
import { AppButton } from "@/shared/components/buttons/app-button.tsx";
import { AppSelect } from "@/shared/components/selects/app-select.tsx";
import {
	AuthRoutesEnum,
	DashboardRoutesEnum,
} from "@/core/enums/app-routes.enum";
import {
	registerSchema,
	registerRoleOptions,
	type IRegisterDto,
} from "../../domain/dtos/register.dto";
import { getErrorMessage } from "@/shared/utils/api-erro.util";

export const RegisterPage = () => {
	const navigate = useNavigate();
	const { signUp } = useAuth();
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (values: IRegisterDto) => {
		try {
			setLoading(true);

			const response = await signUp(values);

			if (response.success) {
				message.success({
					content: response.data?.name
						? `Bem-vindo, ${response.data.name}!`
						: "Bem-vindo!",
					duration: 5,
				});

				navigate(DashboardRoutesEnum.HOME);
			} else {
				message.error({
					content: response.message || "Não foi possível fazer registro",
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
			setLoading(false);
		}
	};

	return (
		<Card style={{ width: "100%", maxWidth: 400 }}>
			<Space orientation="vertical" size={12} style={{ display: "flex" }}>
				<Flex vertical align="center" gap={4} style={{ textAlign: "center" }}>
					<Typography.Title
						level={2}
						style={{ color: "#1677ff", marginBottom: 0 }}>
						Pharmasys
					</Typography.Title>
					<Typography.Text type="secondary">
						Acesse o sistema de gestão
					</Typography.Text>
				</Flex>
				<Form<IRegisterDto>
					layout="vertical"
					onFinish={handleSubmit}
					requiredMark={false}>
					<AppInput
						name="name"
						label="Nome"
						placeholder="Seu nome completo"
						prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
						zodSchema={registerSchema.shape.name}
						maxLength={100}
					/>
					<AppInput
						name="email"
						label="E-mail"
						placeholder="exemplo@pharmasys.com"
						prefix={<IdcardOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
						zodSchema={registerSchema.shape.email}
						maxLength={200}
					/>
					<AppPasswordInput
						name="password"
						label="Senha"
						placeholder="Digite sua senha"
						prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
						zodSchema={registerSchema.shape.password}
						maxLength={255}
					/>
					<AppSelect
						name="role"
						label="Função"
						placeholder="Selecione uma função"
						prefix={<SolutionOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
						options={registerRoleOptions}
						zodSchema={registerSchema.shape.role}
					/>
					<AppButton
						label="Registrar"
						type="primary"
						htmlType="submit"
						loading={loading}
						fullWidth
						formItem={true}
					/>
				</Form>
				<Flex justify="center">
					<Typography.Text>
						Já tem conta?{" "}
						<Typography.Link onClick={() => navigate(AuthRoutesEnum.LOGIN)}>
							Entrar
						</Typography.Link>
					</Typography.Text>
				</Flex>
			</Space>
		</Card>
	);
};
