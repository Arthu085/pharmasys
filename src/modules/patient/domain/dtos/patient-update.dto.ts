import type z from "zod";
import { patientCreateSchema } from "./patient-create.dto";

export const patientUpdateSchema = patientCreateSchema.partial();

export type IPatientUpdateDto = z.infer<typeof patientUpdateSchema>;
