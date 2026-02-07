import { Form, InputNumber, type InputNumberProps } from "antd";
import {
	createZodRule,
	isZodRequired,
	type ZodSchema,
} from "@/shared/validation/antd-zod";

interface AppInputNumberProps extends Omit<InputNumberProps, "name"> {
	name?: string | (string | number)[];
	label?: string;
	zodSchema?: ZodSchema;
	placeholder?: string;
	formatValueFromEvent?: (value: number | string | null) => unknown;
}

export const AppInputNumber = ({
	name,
	label,
	zodSchema,
	className,
	formatValueFromEvent,
	...rest
}: AppInputNumberProps) => {
	const rules = zodSchema ? [createZodRule(zodSchema)] : undefined;
	const required = isZodRequired(zodSchema);

	const getFormattedValueFromEvent =
		(formatValueFromEvent?: (value: number | string | null) => unknown) =>
		(value: any) => {
			const raw = value ?? null;

			const formatted = formatValueFromEvent ? formatValueFromEvent(raw) : raw;

			if (!required) {
				if (formatted == null) return null;
				if (typeof formatted === "string" && !formatted.trim()) return null;
			}

			return formatted;
		};

	if (!name) {
		return (
			<InputNumber
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
			<InputNumber
				className={className}
				style={{ width: "100%", height: 40 }}
				{...rest}
			/>
		</Form.Item>
	);
};
