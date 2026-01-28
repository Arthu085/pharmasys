import { useState } from "react";
import { Card, Flex, Form, Modal, Space, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth.hook";
import { loginSchema, type ILoginDto } from "../../domain/dtos/login.dto";
import { AppInput } from "@/shared/components/inputs/app-input.tsx";
import { AppPasswordInput } from "@/shared/components/inputs/app-password-input.tsx";
import { AppButton } from "@/shared/components/buttons/app-button.tsx";
import {
	AuthRoutesEnum,
	DashboardRoutesEnum,
} from "@/core/enums/app-routes.enum";
import { getErrorMessage } from "@/shared/utils/api-erro.util";

export const LoginPage = () => {
	const navigate = useNavigate();
	const { signIn } = useAuth();
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (values: ILoginDto) => {
		try {
			setLoading(true);

			const response = await signIn(values);

			if (response.success) {
				message.success({
					content: response.data?.name
						? `Bem-vindo de volta, ${response.data.name}!`
						: "Bem-vindo de volta!",
					duration: 5,
				});

				navigate(DashboardRoutesEnum.HOME);
			} else {
				message.error({
					content: response.message || "Não foi possível fazer login",
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
				<Form<ILoginDto>
					layout="vertical"
					onFinish={handleSubmit}
					requiredMark={false}>
					<AppInput
						name="email"
						label="E-mail"
						placeholder="exemplo@pharmasys.com"
						prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
						zodSchema={loginSchema.shape.email}
						maxLength={200}
					/>
					<AppPasswordInput
						name="password"
						label="Senha"
						placeholder="Digite sua senha"
						prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
						zodSchema={loginSchema.shape.password}
						maxLength={255}
					/>
					<AppButton
						label="Entrar"
						type="primary"
						htmlType="submit"
						loading={loading}
						fullWidth
						formItem={true}
					/>
				</Form>
				<Flex justify="center">
					<Typography.Text>
						Não tem conta?{" "}
						<Typography.Link onClick={() => navigate(AuthRoutesEnum.REGISTER)}>
							Criar conta
						</Typography.Link>
					</Typography.Text>
				</Flex>
			</Space>
		</Card>
	);
};
