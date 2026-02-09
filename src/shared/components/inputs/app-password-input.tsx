import {
	createZodRule,
	isZodRequired,
	type ZodSchema,
} from "@/shared/validation/antd-zod";
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
	const required = isZodRequired(zodSchema);

	return (
		<Form.Item name={name} label={label} rules={rules} required={required}>
			<Input.Password style={{ width: "100%", height: 40 }} {...rest} />
		</Form.Item>
	);
};
