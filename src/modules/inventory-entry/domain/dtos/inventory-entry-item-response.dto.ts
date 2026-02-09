export interface IInventoryEntryItemResponseDto {
	quantity: number;
	unitPrice: number;
	item: {
		label: string;
	} | null;
	batch: {
		label: string;
	} | null;
}
