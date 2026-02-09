import { Card, Flex, Form, Space, Typography } from "antd";
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
	registerRolesConfig,
	registerSchema,
	type IRegisterDto,
} from "../../domain/dtos/register.dto";
import { useFormSubmit } from "@/shared/hooks/use-form-submit";

export const RegisterPage = () => {
	const [form] = Form.useForm();
	const navigate = useNavigate();
	const { signUp } = useAuth();

	const { saving, handleSubmit } = useFormSubmit<IRegisterDto>(signUp, () => {
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
				<Form<IRegisterDto>
					form={form}
					layout="vertical"
					onFinish={handleSubmit}
					disabled={saving}
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
						options={registerRolesConfig.options}
						zodSchema={registerSchema.shape.role}
						showSearch={{ optionFilterProp: "label" }}
					/>
					<AppButton
						label="Registrar"
						type="primary"
						htmlType="submit"
						loading={saving}
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
