import type { IListProps } from "@/shared/domain/interfaces/list.interface";
import type { ICompanyListData } from "../dtos/company-list-response.dto";
import type { IStatusDto } from "@/shared/domain/dtos/status.dto";

export interface ICompanyListProps extends Omit<
	IListProps<ICompanyListData>,
	"items"
> {
	companies: ICompanyListData[];
	onEdit: (company: ICompanyListData) => void;
	onDetails: (company: ICompanyListData) => void;
	onStatus: (uuid: string, dto: IStatusDto) => Promise<void>;
	onDelete: (uuid: string) => Promise<void>;
}
