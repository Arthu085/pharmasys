import z from "zod";
import { itemDispensationCreateSchema } from "./item-dispensation-create.dto";
import { itemDispensationItemCreateSchema } from "./item-dispensation-item-create.dto";

export const createItemDispensationRequestSchema = z.object({
	dispensation: itemDispensationCreateSchema,
	items: z.array(itemDispensationItemCreateSchema, {
		error: "Itens são obrigatórios",
	}),
});

export type ICreateItemDispensationRequestDto = z.infer<
	typeof createItemDispensationRequestSchema
>;
