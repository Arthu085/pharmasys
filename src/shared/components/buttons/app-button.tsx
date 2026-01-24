import { Button, Form, type ButtonProps, type FormItemProps } from "antd";

interface AppButtonProps extends ButtonProps {
	label: string;
	fullWidth?: boolean;
	formItem?: boolean | FormItemProps;
}

export const AppButton = ({
	label,
	fullWidth = false,
	formItem,
	...rest
}: AppButtonProps) => {
	const button = (
		<Button
			block={fullWidth}
			size="large"
			htmlType="button"
			style={{ marginBottom: 0, marginTop: 20 }}
			{...rest}>
			{label}
		</Button>
	);

	if (!formItem) return button;

	const formItemProps: FormItemProps =
		typeof formItem === "object"
			? formItem
			: {
					style: { marginBottom: 0, marginTop: 20 },
				};

	return <Form.Item {...formItemProps}>{button}</Form.Item>;
};
