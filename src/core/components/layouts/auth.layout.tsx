import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				minHeight: "100vh",
				width: "100%",
			}}>
			<Outlet />
			<div
				style={{
					position: "fixed",
					bottom: 12,
					left: 0,
					width: "100%",
					textAlign: "center",
					fontSize: 12,
					opacity: 0.6,
				}}>
				v{__APP_VERSION__}
			</div>
		</div>
	);
};
