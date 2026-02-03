import { Form, Input, type InputProps } from "antd";
import {
	createZodRule,
	isZodRequired,
	type ZodSchema,
} from "@/shared/validation/antd-zod";

interface AppInputProps extends InputProps {
	name?: string;
	label?: string;
	zodSchema?: ZodSchema;
	placeholder?: string;
	formatValueFromEvent?: (value: string) => unknown;
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
	const required = isZodRequired(zodSchema);

	const getFormattedValueFromEvent =
		(formatValueFromEvent?: (value: string) => unknown) => (event: any) => {
			const value = event?.target?.value;

			if (typeof value !== "string") return value;

			const formatted = formatValueFromEvent
				? formatValueFromEvent(value)
				: value;
			if (!required && typeof formatted === "string" && !formatted.trim()) {
				return null;
			}

			return formatted;
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
			required={required}
			getValueFromEvent={getFormattedValueFromEvent(formatValueFromEvent)}>
			<Input
				className={className}
				style={{ width: "100%", height: 40 }}
				{...rest}
			/>
		</Form.Item>
	);
};
