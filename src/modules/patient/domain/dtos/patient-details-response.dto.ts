import type { IApiResponse } from "@/core/interfaces/api-response.interface";
import type { IPatientListData } from "./patient-list-response.dto";

export interface IPatientDetailsData extends IPatientListData {
	userCreated: string;
	userUpdated: string | null;
	createdAt: string;
	updatedAt: string | null;
	deletedAt: string | null;
}

export type IPatientDetailsResponse = IApiResponse<IPatientDetailsData>;
