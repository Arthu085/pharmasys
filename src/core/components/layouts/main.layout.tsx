import { Outlet } from "react-router-dom";
import { Layout, Menu, theme } from "antd";
import {
	UserOutlined,
	DashboardOutlined,
	LogoutOutlined,
} from "@ant-design/icons";
import { useAuth } from "@/modules/auth/presentation/hooks/use-auth.hook";

const { Header, Sider, Content, Footer } = Layout;

export const MainLayout = () => {
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();

	const { signOut } = useAuth();

	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Sider breakpoint="lg" collapsedWidth="0">
				<div
					style={{
						height: 32,
						margin: 16,
						background: "rgba(255, 255, 255, 0.2)",
					}}
				/>
				<Menu
					theme="dark"
					mode="inline"
					defaultSelectedKeys={["1"]}
					items={[
						{
							key: "1",
							icon: <DashboardOutlined />,
							label: "Dashboard",
						},
						{
							key: "2",
							icon: <UserOutlined />,
							label: "Usuários",
						},
						{
							key: "3",
							icon: <LogoutOutlined />,
							label: "Sair",
							onClick: signOut,
							danger: true,
						},
					]}
				/>
			</Sider>
			<Layout>
				<Header style={{ padding: 0, background: colorBgContainer }} />
				<Content style={{ margin: "24px 16px 0" }}>
					<div
						style={{
							padding: 24,
							minHeight: 360,
							background: colorBgContainer,
							borderRadius: borderRadiusLG,
						}}>
						<Outlet />
					</div>
				</Content>
				<Footer style={{ textAlign: "center", fontSize: 12, opacity: 0.6 }}>
					v{__APP_VERSION__}
				</Footer>
			</Layout>
		</Layout>
	);
};
