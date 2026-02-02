import { Form, DatePicker, type DatePickerProps } from "antd";
import dayjs, { type Dayjs } from "dayjs";
import { createZodRule, type ZodSchema } from "@/shared/validation/antd-zod";

interface AppDateInputProps extends Omit<
	DatePickerProps,
	"value" | "onChange" | "format"
> {
	name?: string;
	label?: string;
	zodSchema?: ZodSchema;
	placeholder?: string;
	format?: string;
	allowClear?: DatePickerProps["allowClear"];
	value?: Date | null;
	onChange?: (value: Date | null) => void;
}

export const AppDateInput = ({
	name,
	label,
	zodSchema,
	placeholder,
	format = "DD/MM/YYYY",
	allowClear = true,
	value,
	onChange,
	className,
	...rest
}: AppDateInputProps) => {
	const rules = zodSchema ? [createZodRule(zodSchema)] : undefined;

	if (!name) {
		return (
			<DatePicker
				className={className}
				placeholder={placeholder}
				format={format}
				allowClear={allowClear}
				value={value ? dayjs(value) : null}
				onChange={(date) => {
					if (!onChange) return;
					if (!date) return onChange(null);
					if (Array.isArray(date)) return onChange(date[0]?.toDate?.() ?? null);
					onChange(date.toDate());
				}}
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
			getValueProps={(value) => ({
				value: value ? dayjs(value as Date) : null,
			})}
			getValueFromEvent={(date: Dayjs | null) => {
				return date ? date.toDate() : null;
			}}>
			<DatePicker
				className={className}
				placeholder={placeholder}
				format={format}
				allowClear={allowClear}
				style={{ width: "100%", height: 40 }}
				{...rest}
			/>
		</Form.Item>
	);
};
