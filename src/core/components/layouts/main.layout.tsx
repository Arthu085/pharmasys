import { Outlet, useLocation } from "react-router-dom";
import {
	Card,
	Divider,
	Drawer,
	Flex,
	Grid,
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
import { AppButton } from "@/shared/components/buttons/app-button";

const { Header, Sider, Content, Footer } = Layout;

export const MainLayout = () => {
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();
	const screens = Grid.useBreakpoint();
	const isMobile = screens.xs && !screens.sm;
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

	const sidebarContent = (
		<Flex
			className="main-sidebar"
			vertical
			style={{
				height: "100vh",
				minHeight: 0,
				overflow: "hidden",
			}}>
			<Flex vertical style={{ padding: 16, paddingBottom: 8, flexShrink: 0 }}>
				<Typography.Title
					level={4}
					ellipsis={{ tooltip: "Pharmasys" }}
					style={{ margin: 0, whiteSpace: "nowrap" }}>
					Pharmasys
				</Typography.Title>
			</Flex>
			<Divider style={{ margin: "0 0 8px 0", flexShrink: 0 }} />
			<Flex
				vertical
				style={{
					flex: 1,
					minHeight: 0,
					overflow: "auto",
					paddingRight: 8,
				}}>
				<Menu
					theme="light"
					mode="inline"
					items={topItems}
					selectedKeys={getSelectedKeys()}
					onClick={() => {
						if (isMobile) setCollapsed(true);
					}}
					style={{ border: "none" }}
				/>
			</Flex>
			<Divider style={{ margin: "8px 0", flexShrink: 0 }} />
			<Flex style={{ flexShrink: 0 }}>
				<Menu
					theme="light"
					mode="inline"
					items={bottomItems}
					selectedKeys={getSelectedKeys()}
					onClick={() => {
						if (isMobile) setCollapsed(true);
					}}
					style={{ border: "none", width: "100%" }}
				/>
			</Flex>
		</Flex>
	);

	const toggleSidebar = () => setCollapsed((prev) => !prev);

	return (
		<Layout style={{ minHeight: "100vh" }}>
			{isMobile ? (
				<Drawer
					placement="left"
					open={!collapsed}
					onClose={() => setCollapsed(true)}
					size="220px"
					styles={{
						body: {
							padding: 0,
							height: "100%",
							overflow: "hidden",
						},
					}}
					closable={false}>
					{sidebarContent}
				</Drawer>
			) : (
				<Sider
					theme="light"
					breakpoint="md"
					collapsedWidth={0}
					width={220}
					trigger={null}
					collapsible
					collapsed={collapsed}
					style={{
						display: "flex",
						flexDirection: "column",
						overflow: "hidden",
						height: "100vh",
					}}>
					{sidebarContent}
				</Sider>
			)}
			<Layout>
				<Header style={{ padding: 0, background: colorBgContainer }}>
					<Flex
						align="center"
						justify="space-between"
						style={{ height: "100%", paddingInline: 8 }}>
						<AppButton
							type="text"
							icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
							onClick={toggleSidebar}
							style={{
								fontSize: "16px",
								width: 64,
								height: 64,
							}}
						/>
						<AppButton
							icon={<LogoutOutlined />}
							onClick={() => signOut()}
							danger={true}
						/>
					</Flex>
				</Header>
				<Content style={{ margin: isMobile ? "16px 12px 0" : "24px 16px 0" }}>
					<Card
						style={{
							background: colorBgContainer,
							borderRadius: borderRadiusLG,
						}}
						styles={{
							body: {
								padding: isMobile ? 16 : 24,
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
