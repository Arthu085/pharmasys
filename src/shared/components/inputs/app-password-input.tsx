import { createZodRule, type ZodSchema } from "@/shared/validation/antd-zod";
import { Form, Input, type InputProps } from "antd";

interface AppPasswordInputProps extends InputProps {
	name: string;
	label?: string;
	zodSchema?: ZodSchema;
}

export const AppPasswordInput = ({
	name,
	label,
	zodSchema,
	...rest
}: AppPasswordInputProps) => {
	const rules = zodSchema ? [createZodRule(zodSchema)] : undefined;

	return (
		<Form.Item
			name={name}
			label={label}
			rules={rules}
			style={{ marginBottom: 20, marginTop: 20 }}>
			<Input.Password {...rest} />
		</Form.Item>
	);
};
