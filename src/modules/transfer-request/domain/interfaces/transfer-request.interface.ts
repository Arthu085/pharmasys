import type { IListProps } from "@/shared/domain/interfaces/list.interface";
import type { ITransferRequestListData } from "../dtos/transfer-request-list-response.dto";

export interface ITransferRequestProps extends Omit<
	IListProps<ITransferRequestListData>,
	"items"
> {
	transfersRequest: ITransferRequestListData[];
	onDetails: (transferRequest: ITransferRequestListData) => void;
}
