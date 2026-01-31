import type { ICompanyCreateProps } from "./company-create.interface";

export interface ICompanyEditProps extends ICompanyCreateProps {
	uuid: string | null;
}
