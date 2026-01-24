import { AuthRoutesEnum } from "@/core/enums/app-routes.enum";
import type { IRoleGuardProps } from "@/core/interfaces/role-guard.interface";
import { useAuth } from "@/modules/auth/presentation/hooks/use-auth.hook";
import { Result } from "antd";
import { Navigate, Outlet } from "react-router-dom";

export const RoleGuard = ({ allowedRoles, children }: IRoleGuardProps) => {
	const { user } = useAuth();

	if (!user) return <Navigate to={AuthRoutesEnum.LOGIN} />;

	const hasPermission = allowedRoles.includes(user.role);

	if (!hasPermission) {
		return (
			<Result
				status="403"
				title="Acesso Negado"
				subTitle={`Você não tem permissão com a função "${user.role}" para acessar essa página`}
			/>
		);
	}

	return children ? <>{children}</> : <Outlet />;
};
