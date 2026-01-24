import { Form, Select, type SelectProps } from "antd";
import type { DefaultOptionType } from "antd/es/select";
import { createZodRule, type ZodSchema } from "@/shared/validation/antd-zod";

interface AppSelectProps extends Omit<SelectProps, "options"> {
	name: string;
	label?: string;
	zodSchema?: ZodSchema;
	options?: readonly DefaultOptionType[];
	placeholder?: string;
}

export const AppSelect = ({
	name,
	label,
	zodSchema,
	className,
	options,
	...rest
}: AppSelectProps) => {
	const rules = zodSchema ? [createZodRule(zodSchema)] : undefined;

	return (
		<Form.Item
			name={name}
			label={label}
			rules={rules}
			style={{ marginBottom: 20, marginTop: 20 }}>
			<Select
				className={className}
				options={options ? [...options] : undefined}
				{...rest}
			/>
		</Form.Item>
	);
};
