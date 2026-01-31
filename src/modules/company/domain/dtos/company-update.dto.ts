import type z from "zod";
import { companyCreateSchema } from "./company-create.dto";

export const companyUpdateSchema = companyCreateSchema.partial();

export type ICompanyUpdateDto = z.infer<typeof companyUpdateSchema>;
