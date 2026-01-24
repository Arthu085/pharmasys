import { useAuth } from "@/modules/auth/presentation/hooks/use-auth.hook";
import { Flex, Spin } from "antd";
import { Navigate, Outlet } from "react-router-dom";

export const GuestGuard = () => {
	const { isAuthenticated, isLoading } = useAuth();

	if (isLoading) {
		return (
			<Flex justify="center" align="center" style={{ height: "100vh" }}>
				<Spin size="large" tip="Carregando sessão..." />
			</Flex>
		);
	}

	if (isAuthenticated) {
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
};
