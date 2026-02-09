import type { IApiResponse } from "@/core/interfaces/api-response.interface";
import type { ILoginData } from "./login-response.dto";

export interface IRegisterData extends ILoginData {}
export type IRegisterResponse = IApiResponse<IRegisterData>;
