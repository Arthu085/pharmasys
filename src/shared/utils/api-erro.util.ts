import { isAxiosError } from "axios";

export const getErrorMessage = (error: unknown): string => {
	if (isAxiosError(error)) {
		if (!error.response) {
			if (error.code === "ECONNABORTED") {
				return "Tempo excedido ao conectar com o servidor.";
			}

			return "Não foi possível conectar com o servidor";
		}

		const backendMessage = error.response?.data?.message;

		if (backendMessage) {
			return backendMessage;
		}

		if (error.response?.status === 403) return "Sem permissão de acesso.";
		if (error.response?.status === 404) return "Recurso não encontrado.";
		if (error.response?.status === 500) return "Erro interno do servidor.";
	}

	if (error instanceof Error) {
		return error.message;
	}

	return "Erro ao conectar com o servidor.";
};
