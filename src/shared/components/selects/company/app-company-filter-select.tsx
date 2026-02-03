import { Flex, Typography } from "antd";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import type { SelectProps } from "antd";
import { AppCompanySelect } from "./app-company-select";

const { Text } = Typography;

interface AppCompanyFilterSelectProps extends Omit<SelectProps, "options"> {
	value?: string;
	onChange: (value: any) => void;
	placeholder?: string;
	label?: string;
	width?: number | string;
	size?: SizeType;
	onlyActive?: boolean;
	limit?: number;
}

export const AppCompanyFilterSelect = ({
	value,
	onChange,
	placeholder = "Buscar pela empresa...",
	label,
	width = "100%",
	size = "middle",
	onlyActive,
	limit,
	style,
	...rest
}: AppCompanyFilterSelectProps) => {
	return (
		<Flex vertical gap={4} style={{ width }}>
			{label && <Text strong>{label}</Text>}
			<AppCompanySelect
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				showSearch
				size={size}
				{...rest}
			/>
		</Flex>
	);
};
