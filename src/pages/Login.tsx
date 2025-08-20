import { Button, Card, Form, Input } from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";


type FieldType = {
  email?: string;
  password?: string;
};

const Login = () => {
  const [form] = Form.useForm();

  return (
    <Card
      title="Entre sua Conta"
      extra={<Link to="/register">Não tem uma conta? Faça o registro</Link>}
      style={{ width: 500 }}>
      <Form<FieldType>
        form={form}
        name="login"
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
          ]}>
          <Input prefix={<MailOutlined />} placeholder="seu@email.com" />
        </Form.Item>
        <Form.Item
          label="Senha"
          name="password"
          rules={[
            { required: true, message: 'Por favor, insira sua senha!' },
          ]}>
          <Input.Password prefix={<LockOutlined />} placeholder="Senha" />
        </Form.Item>
        <Form.Item style={{ marginTop: '50px' }}>
          <Button
            type="primary"
            htmlType="submit"
            block
            icon={<UserOutlined />}>
            Entrar
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Login;