export interface IUserEditProps {
	open: boolean;
	onClose: () => void;
	uuid: string | null;
	onSuccess?: () => void;
}
