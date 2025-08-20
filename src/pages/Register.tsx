import { Button, Card, Form, Input, Select } from "antd";
import { LockOutlined, MailOutlined, UserAddOutlined } from "@ant-design/icons";
import { validatePasswordMatch } from "../utils/validators";

import ScreenNoAuth from "../components/ScreenNoAuth";


type FieldType = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};

const Register = () => {
  const [form] = Form.useForm();

  return (
    <ScreenNoAuth>
      <Card
        title="Crie sua Conta"
        //extra={<Link to="/login">Já tem uma conta? Faça o login</Link>}
        style={{ width: 500 }}>
        <Form<FieldType>
          form={form}
          name="register"
          layout="vertical"
          //onFinish={onFinish}
          //onFinishFailed={onFinishFailed}
          autoComplete="off">
          <Form.Item
            label="E-mail"
            name="email"
            rules={[
              { required: true, message: 'Por favor, insira seu e-mail!' },
              { type: 'email', message: 'Por favor, insira um e-mail válido!' }
            ]} >
            <Input prefix={<MailOutlined />} placeholder="seu@email.com" />
          </Form.Item>
          <Form.Item
            label="Senha"
            name="password"
            rules={[
              { required: true, message: 'Por favor, insira sua senha!' },
              { min: 6, message: 'A senha deve ter no mínimo 6 caracteres!' }
            ]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Senha" />
          </Form.Item>
          <Form.Item
            label="Confirmar Senha"
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Por favor, confirme sua senha!' },
              validatePasswordMatch,
            ]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Confirme a senha" />
          </Form.Item>
          <Form.Item label="Função">
            <Select>
              <Select.Option value="teste">Teste</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item style={{ marginTop: '50px' }}>
            <Button
              type="primary"
              htmlType="submit"
              block
              icon={<UserAddOutlined />}
            >
              Registrar
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </ScreenNoAuth>
  );
};

export default Register;