import { Form, Input, type InputProps } from "antd";
import { createZodRule, type ZodSchema } from "@/shared/validation/antd-zod";

interface AppInputProps extends InputProps {
	name?: string;
	label?: string;
	zodSchema?: ZodSchema;
	placeholder?: string;
	formatValueFromEvent?: (value: string) => string;
}

export const AppInput = ({
	name,
	label,
	zodSchema,
	className,
	formatValueFromEvent,
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
			getValueFromEvent={(event) => {
				const value = event?.target?.value;
				if (typeof value !== "string") return value;
				return formatValueFromEvent ? formatValueFromEvent(value) : value;
			}}>
			<Input className={className} {...rest} />
		</Form.Item>
	);
};
