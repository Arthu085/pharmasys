import type { ICreateProps } from "./create.interface";

export interface IEditProps extends ICreateProps {
	uuid: string | null;
}
