import { Outlet } from "react-router-dom";
import { Flex, Layout } from "antd";

const { Content, Footer } = Layout;

export const AuthLayout = () => {
	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Content style={{ display: "flex" }}>
				<Flex
					justify="center"
					align="center"
					style={{ flex: 1, width: "100%" }}>
					<Outlet />
				</Flex>
			</Content>
			<Footer style={{ textAlign: "center", fontSize: 12, opacity: 0.6 }}>
				Versão: {__APP_VERSION__}
			</Footer>
		</Layout>
	);
};
