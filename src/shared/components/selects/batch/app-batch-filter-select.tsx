import { Flex, Typography } from "antd";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import type { SelectProps } from "antd";
import { AppBatchSelect } from "./app-batch-select";

const { Text } = Typography;

interface AppBatchFilterSelectProps extends Omit<SelectProps, "options"> {
	value?: string;
	onChange: (value: any) => void;
	placeholder?: string;
	label?: string;
	width?: number | string;
	size?: SizeType;
	onlyActive?: boolean;
	limit?: number;
}

export const AppBatchFilterSelect = ({
	value,
	onChange,
	placeholder = "Buscar pelo lote...",
	label,
	width = "100%",
	size = "middle",
	onlyActive,
	limit,
	style,
	...rest
}: AppBatchFilterSelectProps) => {
	return (
		<Flex vertical gap={4} style={{ width }}>
			{label && <Text strong>{label}</Text>}
			<AppBatchSelect
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
