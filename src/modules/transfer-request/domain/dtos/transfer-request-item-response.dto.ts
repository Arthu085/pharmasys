import type {
	TransferStatusItemEnum,
	TransferStatusItemEnumTranslated,
} from "../enums/transfer-status-item.enum";

export interface ITransferRequestItemResponseDto {
	uuid: string;
	quantity: number;
	statusTransferItem: {
		value: TransferStatusItemEnum;
		label: TransferStatusItemEnumTranslated;
	} | null;
	item: {
		value: string;
		label: string;
	} | null;
	batch: {
		value: string;
		label: string;
	} | null;
}
