import { Checkbox, Form, type CheckboxProps } from "antd";
import {
	createZodRule,
	isZodRequired,
	type ZodSchema,
} from "@/shared/validation/antd-zod";

interface AppCheckboxProps extends Omit<CheckboxProps, "name"> {
	name?: string | (string | number)[];
	label?: string;
	zodSchema?: ZodSchema;
}

export const AppCheckbox = ({
	name,
	label,
	zodSchema,
	className,
	...rest
}: AppCheckboxProps) => {
	const rules = zodSchema ? [createZodRule(zodSchema)] : undefined;
	const required = isZodRequired(zodSchema);

	if (!name) {
		return (
			<Checkbox className={className} {...rest}>
				{label}
			</Checkbox>
		);
	}

	return (
		<Form.Item
			name={name}
			label={label}
			rules={rules}
			required={required}
			valuePropName="checked"
			initialValue={required ? false : undefined}>
			<Checkbox className={className} {...rest} />
		</Form.Item>
	);
};
