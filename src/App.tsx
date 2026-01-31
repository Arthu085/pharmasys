import { ConfigProvider, App as AntdApp } from "antd";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./modules/auth/presentation/contexts/auth.provider";
import { antThemeConfig } from "./core/config/theme.config";
import { router } from "./core/routes/router";
import ptBR from "antd/locale/pt_BR";
import "./index.css";

function App() {
	return (
		<ConfigProvider theme={antThemeConfig} locale={ptBR}>
			<AntdApp>
				<AuthProvider>
					<RouterProvider router={router} />
				</AuthProvider>
			</AntdApp>
		</ConfigProvider>
	);
}

export default App;
