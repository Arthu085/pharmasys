import { Form, DatePicker, type DatePickerProps } from "antd";
import dayjs, { type Dayjs } from "dayjs";
import {
	createZodRule,
	isZodRequired,
	type ZodSchema,
} from "@/shared/validation/antd-zod";

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
	const required = isZodRequired(zodSchema);

	const getDatePickerValueProps = (value: unknown) => ({
		value: value ? dayjs(value as Date) : null,
	});

	const getDateFromPickerEvent = (date: Dayjs | null) => {
		return date ? date.toDate() : null;
	};

	const handleDatePickerChange =
		(onChange?: (value: Date | null) => void) =>
		(date: Dayjs | Dayjs[] | null) => {
			if (!onChange) return;

			if (!date) {
				onChange(null);
				return;
			}

			if (Array.isArray(date)) {
				onChange(date[0]?.toDate?.() ?? null);
				return;
			}

			onChange(date.toDate());
		};

	if (!name) {
		return (
			<DatePicker
				className={className}
				placeholder={placeholder}
				format={format}
				allowClear={allowClear}
				value={value ? dayjs(value) : null}
				onChange={handleDatePickerChange(onChange)}
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
			getValueProps={getDatePickerValueProps}
			getValueFromEvent={getDateFromPickerEvent}>
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
