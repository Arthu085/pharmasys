import type { IListProps } from "@/shared/domain/interfaces/list.interface";
import type { IStatusDto } from "@/shared/domain/dtos/status.dto";
import type { IStockLocationListData } from "../dtos/stock-location-list-response.dto";

export interface IStockLocationListProps extends Omit<
	IListProps<IStockLocationListData>,
	"items"
> {
	stockLocations: IStockLocationListData[];
	onEdit: (stockLocation: IStockLocationListData) => void;
	onDetails: (stockLocation: IStockLocationListData) => void;
	onStatus: (uuid: string, dto: IStatusDto) => Promise<void>;
	onDelete: (uuid: string) => Promise<void>;
}
