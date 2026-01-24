import { ConfigProvider, App as AntdApp } from "antd";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./modules/auth/presentation/contexts/auth.provider";
import { antThemeConfig } from "./core/config/theme.config";
import { router } from "./core/routes/router";
import "./index.css";

function App() {
	return (
		<ConfigProvider theme={antThemeConfig}>
			<AntdApp>
				<AuthProvider>
					<RouterProvider router={router} />
				</AuthProvider>
			</AntdApp>
		</ConfigProvider>
	);
}

export default App;
