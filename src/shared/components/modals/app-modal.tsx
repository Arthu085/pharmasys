import { type ReactNode } from "react";
import { Modal, Spin, type ModalProps } from "antd";

interface AppModalProps extends ModalProps {
	children: ReactNode;
	confirmLoading?: boolean;
	loading?: boolean;
	hideFooter?: boolean;
}

export const AppModal = ({
	children,
	confirmLoading = false,
	loading = false,
	hideFooter = false,
	...rest
}: AppModalProps) => {
	return (
		<Modal
			{...rest}
			centered
			destroyOnHidden
			maskClosable
			keyboard
			width={600}
			footer={hideFooter ? null : undefined}
			confirmLoading={confirmLoading}
			cancelText="Cancelar"
			okText="Salvar"
			okButtonProps={{
				loading: confirmLoading,
				...rest.okButtonProps,
			}}>
			<Spin spinning={loading}>{children}</Spin>
		</Modal>
	);
};
