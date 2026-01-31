import { Form, Select, type SelectProps } from "antd";
import type { DefaultOptionType } from "antd/es/select";
import { createZodRule, type ZodSchema } from "@/shared/validation/antd-zod";

interface AppSelectProps extends Omit<SelectProps, "options"> {
	name?: string;
	label?: string;
	zodSchema?: ZodSchema;
	options?: readonly DefaultOptionType[];
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

	if (!name) {
		return (
			<Select
				options={options ? [...options] : undefined}
				style={{ height: 40 }}
				{...rest}
			/>
		);
	}

	return (
		<Form.Item name={name} label={label} rules={rules} required={!!zodSchema}>
			<Select
				options={options ? [...options] : undefined}
				style={{ height: 40 }}
				{...rest}
			/>
		</Form.Item>
	);
};
