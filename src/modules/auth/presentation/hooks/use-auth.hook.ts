import { useContext } from "react";
import { AuthContext } from "../contexts/auth.provider";
import type { IAuthContext } from "../interfaces/auth-context.interface";

export const useAuth = (): IAuthContext => {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error("useAuth deve ser utilizado dentro de um AuthProvider");
	}

	return context;
};
