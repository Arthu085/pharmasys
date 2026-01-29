import { Form, Input, type InputProps } from "antd";
import { createZodRule, type ZodSchema } from "@/shared/validation/antd-zod";

interface AppInputProps extends InputProps {
	name?: string;
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

	if (!name) {
		return <Input className={className} {...rest} />;
	}

	return (
		<Form.Item
			name={name}
			label={label}
			rules={rules}
			required={!!zodSchema}
			style={{ marginBottom: 20, marginTop: 20 }}>
			<Input className={className} {...rest} />
		</Form.Item>
	);
};
