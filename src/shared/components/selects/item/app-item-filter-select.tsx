import { Flex, Typography } from "antd";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import type { SelectProps } from "antd";
import { AppItemSelect } from "./app-item-select";

const { Text } = Typography;

interface AppItemFilterSelectProps extends Omit<SelectProps, "options"> {
	value?: string;
	onChange: (value: any) => void;
	placeholder?: string;
	label?: string;
	width?: number | string;
	size?: SizeType;
	onlyActive?: boolean;
	limit?: number;
}

export const AppItemFilterSelect = ({
	value,
	onChange,
	placeholder = "Buscar pelo item...",
	label,
	width = "100%",
	size = "middle",
	onlyActive,
	limit,
	style,
	...rest
}: AppItemFilterSelectProps) => {
	return (
		<Flex vertical gap={4} style={{ width }}>
			{label && <Text strong>{label}</Text>}
			<AppItemSelect
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				size={size}
				showSearch
				{...rest}
			/>
		</Flex>
	);
};
