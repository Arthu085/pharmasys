import { Button, Form, type ButtonProps, type FormItemProps } from "antd";

interface AppButtonProps extends ButtonProps {
	label?: string;
	fullWidth?: boolean;
	formItem?: boolean | FormItemProps;
}

export const AppButton = ({
	label,
	children,
	fullWidth = false,
	formItem,
	...rest
}: AppButtonProps) => {
	const isFormButton = Boolean(formItem);
	const style = isFormButton
		? { marginBottom: 0, marginTop: 20, ...rest.style }
		: rest.style;
	const size = rest.size ?? (isFormButton ? "large" : undefined);
	const htmlType = rest.htmlType ?? "button";

	const button = (
		<Button
			{...rest}
			block={fullWidth}
			size={size}
			htmlType={htmlType}
			style={style}>
			{children ?? label}
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
