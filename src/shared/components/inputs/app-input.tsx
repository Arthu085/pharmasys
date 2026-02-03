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

	const getFormattedValueFromEvent =
		(formatValueFromEvent?: (value: string) => string) => (event: any) => {
			const value = event?.target?.value;

			if (typeof value !== "string") return value;

			return formatValueFromEvent ? formatValueFromEvent(value) : value;
		};

	if (!name) {
		return (
			<Input
				className={className}
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
			required={!!zodSchema}
			getValueFromEvent={getFormattedValueFromEvent(formatValueFromEvent)}>
			<Input
				className={className}
				style={{ width: "100%", height: 40 }}
				{...rest}
			/>
		</Form.Item>
	);
};
