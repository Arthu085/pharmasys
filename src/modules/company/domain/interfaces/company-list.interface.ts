import type { ICompanyListData } from "../dtos/company-list-response.dto";
import type { IStatusDto } from "@/shared/domain/dtos/status.dto";

export interface ICompanyListProps {
	loading: boolean;
	companies: ICompanyListData[];
	total: number;
	onEdit: (company: ICompanyListData) => void;
	onDetails: (company: ICompanyListData) => void;
	onStatus: (uuid: string, dto: IStatusDto) => Promise<void>;
	onDelete: (uuid: string) => Promise<void>;
	page: number;
	pageSize: number;
	onChangePage: (page: number, pageSize: number) => void;
}
