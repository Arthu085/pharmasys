import { z } from "zod";

export const loginSchema = z.object({
	email: z.email({ error: "E-mail inválido" }),
	password: z
		.string({ error: "Senha é obrigatória" })
		.min(6, { error: "Senha deve ter no mínimo 6 caracteres" }),
});

export type ILoginDto = z.infer<typeof loginSchema>;
