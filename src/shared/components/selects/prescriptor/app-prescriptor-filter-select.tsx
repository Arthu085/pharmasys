import { Flex, Typography } from "antd";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import type { SelectProps } from "antd";
import { AppPrescriptorSelect } from "./app-prescriptor-select";

const { Text } = Typography;

interface AppPrescriptorFilterSelectProps extends Omit<SelectProps, "options"> {
	value?: string;
	onChange: (value: any) => void;
	placeholder?: string;
	label?: string;
	width?: number | string;
	size?: SizeType;
	onlyActive?: boolean;
	limit?: number;
}

export const AppPrescriptorFilterSelect = ({
	value,
	onChange,
	placeholder = "Buscar pelo prescriptor...",
	label,
	width = "100%",
	size = "middle",
	onlyActive,
	limit,
	style,
	...rest
}: AppPrescriptorFilterSelectProps) => {
	return (
		<Flex vertical gap={4} style={{ width }}>
			{label && <Text strong>{label}</Text>}
			<AppPrescriptorSelect
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
