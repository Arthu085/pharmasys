import type { Rule } from "antd/es/form";
import type { ZodType } from "zod";

export type ZodSchema = ZodType<unknown, unknown>;

export const createZodRule = (schema: ZodSchema): Rule => ({
	validator: async (_, value) => {
		const result = schema.safeParse(value);
		if (result.success) return;

		const message = result.error.issues[0]?.message ?? "Valor inválido";
		throw new Error(message);
	},
});
