import { type ReactNode } from "react";
import { Modal, type ModalProps } from "antd";

interface AppModalProps extends ModalProps {
	children: ReactNode;
	loading?: boolean;
	hideFooter?: boolean;
}

export const AppModal = ({
	children,
	loading = false,
	hideFooter = false,
	...rest
}: AppModalProps) => {
	return (
		<Modal
			{...rest}
			centered
			destroyOnHidden
			maskClosable={false}
			width={600}
			footer={hideFooter ? null : undefined}
			confirmLoading={loading}
			cancelText="Cancelar"
			okText="Salvar"
			okButtonProps={{
				loading: loading,
				...rest.okButtonProps,
			}}>
			{children}
		</Modal>
	);
};
