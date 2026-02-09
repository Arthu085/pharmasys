import { Form, Input } from "antd";
import type { ComponentProps } from "react";
import {
	createZodRule,
	isZodRequired,
	type ZodSchema,
} from "@/shared/validation/antd-zod";

type AntdTextAreaProps = ComponentProps<typeof Input.TextArea>;

interface AppTextAreaProps extends Omit<AntdTextAreaProps, "name"> {
	name?: string | (string | number)[];
	label?: string;
	zodSchema?: ZodSchema;
	placeholder?: string;
	formatValueFromEvent?: (value: string) => unknown;
}

export const AppTextArea = ({
	name,
	label,
	zodSchema,
	className,
	formatValueFromEvent,
	...rest
}: AppTextAreaProps) => {
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
			<Input.TextArea
				className={className}
				style={{ width: "100%" }}
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
			<Input.TextArea
				className={className}
				style={{ width: "100%" }}
				{...rest}
			/>
		</Form.Item>
	);
};
