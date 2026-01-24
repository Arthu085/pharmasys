import type { IEnvConfig } from "../interfaces/env-config.interface";

const env: IEnvConfig = {
	API_URL: import.meta.env.VITE_API_URL || "http://localhost:3000",
	NODE_ENV: import.meta.env.MODE as IEnvConfig["NODE_ENV"],
};

export const AppConfig = Object.freeze(env);
