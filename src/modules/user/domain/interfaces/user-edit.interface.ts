import type { IUserCreateProps } from "./user-create.interface";

export interface IUserEditProps extends IUserCreateProps {
	uuid: string | null;
}
