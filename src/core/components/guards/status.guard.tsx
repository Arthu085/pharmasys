import { AuthRoutesEnum } from "@/core/enums/app-routes.enum";
import type { IStatusGuardProps } from "@/core/interfaces/status-guard.interface";
import { useAuth } from "@/modules/auth/presentation/hooks/use-auth.hook";
import { Result } from "antd";
import { Navigate, Outlet } from "react-router-dom";

export const StatusGuard = ({ allowedStatus, children }: IStatusGuardProps) => {
	const { user } = useAuth();

	if (!user) return <Navigate to={AuthRoutesEnum.LOGIN} />;

	const hasStatus = allowedStatus === user.status;

	if (!hasStatus) {
		return (
			<Result
				status="403"
				title="Acesso Negado"
				subTitle="Seu status de usuário não permite o acesso a esta seção"
			/>
		);
	}

	return children ? <>{children}</> : <Outlet />;
};
