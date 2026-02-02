import { Flex, Typography, type DatePickerProps } from "antd";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import { AppDateInput } from "./app-date-input";

const { Text } = Typography;

interface AppDateFilterInputProps extends Omit<
	DatePickerProps,
	"value" | "onChange" | "format"
> {
	value?: Date | null;
	onChange: (value: Date | null) => void;
	placeholder?: string;
	label?: string;
	width?: number | string;
	size?: SizeType;
	format?: string;
}

export const AppDateFilterInput = ({
	value,
	onChange,
	placeholder = "Selecione a data...",
	label,
	width = "100%",
	size = "middle",
	format = "DD/MM/YYYY",
	...rest
}: AppDateFilterInputProps) => {
	return (
		<Flex vertical gap={4} style={{ width }}>
			{label && <Text strong>{label}</Text>}
			<AppDateInput
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				size={size}
				format={format}
				style={{ width: "100%" }}
				{...rest}
			/>
		</Flex>
	);
};
