export interface IItemDispensationItemResponseDto {
	quantity: number;
	isPsychotropic: boolean;
	prescriptionNotificationNumber: string | null;
	item: {
		label: string;
	} | null;
	batch: {
		label: string;
	} | null;
}
