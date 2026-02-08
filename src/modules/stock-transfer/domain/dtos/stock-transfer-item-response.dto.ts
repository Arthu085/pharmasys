export interface IStockTransferItemResponseDto {
	quantity: number;
	item: {
		label: string;
	} | null;
	batch: {
		label: string;
	} | null;
}
