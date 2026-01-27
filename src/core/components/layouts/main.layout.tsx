import { Outlet, useLocation } from "react-router-dom";
import {
	Button,
	Card,
	Divider,
	Flex,
	Layout,
	Menu,
	theme,
	Typography,
} from "antd";
import {
	LogoutOutlined,
	MenuUnfoldOutlined,
	MenuFoldOutlined,
} from "@ant-design/icons";
import { useAuth } from "@/modules/auth/presentation/hooks/use-auth.hook";
import { useMemo, useState } from "react";
import { filterMenuByRole } from "@/core/utils/menu.util";
import { bottomMenuItems, topMenuItems } from "@/core/config/menu.config";

const { Header, Sider, Content, Footer } = Layout;

export const MainLayout = () => {
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();
	const { signOut, user } = useAuth();
	const location = useLocation();
	const [collapsed, setCollapsed] = useState(true);

	const topItems = useMemo(() => {
		return filterMenuByRole(topMenuItems, user?.role);
	}, [user]);

	const bottomItems = useMemo(() => {
		return bottomMenuItems(signOut);
	}, [signOut]);

	const getSelectedKeys = () => {
		const path = location.pathname;
		return [path];
	};

	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Sider
				theme="light"
				breakpoint="xs"
				collapsedWidth={0}
				trigger={null}
				collapsible
				collapsed={collapsed}
				style={{
					display: "flex",
					flexDirection: "column",
					overflow: "hidden",
				}}>
				<Flex vertical style={{ height: "100%", minHeight: 0 }}>
					<Flex vertical style={{ padding: 16, paddingBottom: 8 }}>
						<Typography.Title
							level={4}
							ellipsis={{ tooltip: "Pharmasys" }}
							style={{ margin: 0, whiteSpace: "nowrap" }}>
							Pharmasys
						</Typography.Title>
					</Flex>
					<Divider style={{ margin: "0 0 8px 0" }} />
					<Flex vertical style={{ flex: 1, minHeight: 0, overflow: "auto" }}>
						<Menu
							theme="light"
							mode="inline"
							items={topItems}
							selectedKeys={getSelectedKeys()}
						/>
					</Flex>
					<Divider style={{ margin: "8px 0" }} />
					<Menu
						theme="light"
						mode="inline"
						items={bottomItems}
						selectedKeys={getSelectedKeys()}
					/>
				</Flex>
			</Sider>
			<Layout>
				<Header style={{ padding: 0, background: colorBgContainer }}>
					<Flex
						align="center"
						justify="space-between"
						style={{ height: "100%", paddingInline: 8 }}>
						<Button
							type="text"
							icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
							onClick={() => setCollapsed(!collapsed)}
							style={{
								fontSize: "16px",
								width: 64,
								height: 64,
							}}
						/>
						<Button
							icon={<LogoutOutlined />}
							onClick={() => signOut()}
							danger={true}
						/>
					</Flex>
				</Header>
				<Content style={{ margin: "24px 16px 0" }}>
					<Card
						style={{
							background: colorBgContainer,
							borderRadius: borderRadiusLG,
						}}
						styles={{
							body: {
								padding: 24,
								minHeight: 360,
							},
						}}>
						<Outlet />
					</Card>
				</Content>
				<Footer style={{ textAlign: "center", fontSize: 12, opacity: 0.6 }}>
					Versão: {__APP_VERSION__}
				</Footer>
			</Layout>
		</Layout>
	);
};
