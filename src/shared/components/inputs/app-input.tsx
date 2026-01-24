import { Form, Input, type InputProps } from "antd";
import { createZodRule, type ZodSchema } from "@/shared/validation/antd-zod";

interface AppInputProps extends InputProps {
	name: string;
	label?: string;
	zodSchema?: ZodSchema;
	placeholder?: string;
}

export const AppInput = ({
	name,
	label,
	zodSchema,
	className,
	...rest
}: AppInputProps) => {
	const rules = zodSchema ? [createZodRule(zodSchema)] : undefined;

	return (
		<Form.Item
			name={name}
			label={label}
			rules={rules}
			style={{ marginBottom: 20, marginTop: 20 }}>
			<Input className={className} {...rest} />
		</Form.Item>
	);
};
