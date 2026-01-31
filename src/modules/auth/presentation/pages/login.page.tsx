import { Card, Flex, Form, Space, Typography } from "antd";
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
import { useFormSubmit } from "@/shared/hooks/use-form-submit";

export const LoginPage = () => {
	const [form] = Form.useForm();
	const navigate = useNavigate();
	const { signIn } = useAuth();
	const { saving, handleSubmit } = useFormSubmit<ILoginDto>(signIn, () => {
		navigate(DashboardRoutesEnum.HOME);
	});

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
					form={form}
					layout="vertical"
					onFinish={handleSubmit}
					disabled={saving}
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
						loading={saving}
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
