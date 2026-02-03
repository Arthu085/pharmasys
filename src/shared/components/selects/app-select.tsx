import { Form, Select, type SelectProps } from "antd";
import type { DefaultOptionType } from "antd/es/select";
import {
	createZodRule,
	isZodRequired,
	type ZodSchema,
} from "@/shared/validation/antd-zod";

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
	const required = isZodRequired(zodSchema);

	if (!name) {
		return (
			<Select
				options={options ? [...options] : undefined}
				style={{ width: "100%", height: 40 }}
				{...rest}
			/>
		);
	}

	return (
		<Form.Item
			name={name}
			label={label}
			rules={rules}
			required={required}
			getValueFromEvent={(value) =>
				value === undefined && !required ? null : value
			}>
			<Select
				options={options ? [...options] : undefined}
				style={{ width: "100%", height: 40 }}
				{...rest}
			/>
		</Form.Item>
	);
};
