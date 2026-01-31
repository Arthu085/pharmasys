import type z from "zod";
import { userCreateSchema } from "./user-create.dto";

export const userUpdateSchema = userCreateSchema.partial();

export type IUserUpdateDto = z.infer<typeof userUpdateSchema>;
