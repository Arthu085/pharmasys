export interface IInventoryExitItemResponseDto {
	quantity: number;
	item: {
		label: string;
	} | null;
	batch: {
		label: string;
	} | null;
}
