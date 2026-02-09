import type { Rule } from "antd/es/form";
import type { ZodType } from "zod";

export type ZodSchema = ZodType<unknown, unknown>;

export const isZodRequired = (schema?: ZodSchema): boolean => {
	if (!schema) return false;
	const root: any = schema;
	if (typeof root?.isNullable === "function" && root.isNullable()) return false;

	let current: any = schema;
	while (current) {
		if (typeof current?.isNullable === "function" && current.isNullable()) {
			return false;
		}

		const typeName: string | undefined = current?._def?.typeName;
		if (!typeName) break;

		if (typeName === "ZodOptional") return false;
		if (typeName === "ZodNullable") return false;
		if (typeName === "ZodDefault") return false;

		if (typeName === "ZodEffects") {
			current = current._def.schema;
			continue;
		}

		if (typeName === "ZodPipeline") {
			current = current._def.out;
			continue;
		}

		if (typeName === "ZodBranded" || typeName === "ZodReadonly") {
			current = current._def.type;
			continue;
		}

		break;
	}

	return true;
};

export const createZodRule = (schema: ZodSchema): Rule => ({
	validator: async (_, value) => {
		const result = schema.safeParse(value);
		if (result.success) return;

		const message = result.error.issues[0]?.message ?? "Valor inválido";
		throw new Error(message);
	},
});
