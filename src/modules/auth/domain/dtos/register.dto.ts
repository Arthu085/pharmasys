import { RoleEnum, RoleEnumTranslated } from "@/shared/domain/enums/role.enum";
import { z } from "zod";

export const registerRoleOptions = [
	{ label: RoleEnumTranslated.OPERADOR, value: RoleEnum.OPERADOR },
	{ label: RoleEnumTranslated.FARMACEUTICO, value: RoleEnum.FARMACEUTICO },
] as const;

const allowedRegisterRoles = registerRoleOptions.map((opt) => opt.value) as [
	RoleEnum.OPERADOR,
	RoleEnum.FARMACEUTICO,
];

export const registerSchema = z.object({
	name: z
		.string({ error: "Nome é obrigatório" })
		.min(3, { error: "Nome deve ter no mínimo 3 caracteres" })
		.max(100, { error: "Nome deve ter no máximo 100 caracteres" }),
	email: z
		.email({ error: "E-mail inválido" })
		.max(255, { error: "E-mail deve ter no máximo 255 caracteres" }),
	password: z
		.string({ error: "Senha é obrigatória" })
		.min(6, { error: "Senha deve ter no mínimo 6 caracteres" })
		.max(40, { error: "Senha deve ter no máximo 40 caracteres" }),
	role: z.enum(allowedRegisterRoles, { error: "Função inválida" }),
});

export type IRegisterDto = z.infer<typeof registerSchema>;
