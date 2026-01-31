import { z } from "zod";

const customErrorMap: z.ZodErrorMap = (issue: any, ctx?: any) => {
	if (issue.code === "invalid_type") {
		if (issue.received === "undefined" || issue.received === "null") {
			return { message: "Campo obrigatório" };
		}
		if (issue.expected === "string") {
			return { message: "Este campo deve ser um texto" };
		}
		if (issue.expected === "number") {
			return { message: "Este campo deve ser um número" };
		}
	}

	if (issue.code === "too_small") {
		if (issue.type === "string") {
			return { message: `Deve ter no mínimo ${issue.minimum} caracteres` };
		}
	}

	if (issue.code === "too_big") {
		if (issue.type === "string") {
			return { message: `Deve ter no máximo ${issue.maximum} caracteres` };
		}
	}

	return { message: ctx?.defaultError ?? "Erro de validação" };
};

z.config({ customError: customErrorMap });

export const zodConfig = {
	initialized: true,
};
