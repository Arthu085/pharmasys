import { Flex, Typography } from "antd";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import type { SelectProps } from "antd";
import { AppPatientSelect } from "./app-patient-select";

const { Text } = Typography;

interface AppPatientFilterSelectProps extends Omit<SelectProps, "options"> {
	value?: string;
	onChange: (value: any) => void;
	placeholder?: string;
	label?: string;
	width?: number | string;
	size?: SizeType;
	onlyActive?: boolean;
	limit?: number;
}

export const AppPatientFilterSelect = ({
	value,
	onChange,
	placeholder = "Buscar pelo paciente...",
	label,
	width = "100%",
	size = "middle",
	onlyActive,
	limit,
	style,
	...rest
}: AppPatientFilterSelectProps) => {
	return (
		<Flex vertical gap={4} style={{ width }}>
			{label && <Text strong>{label}</Text>}
			<AppPatientSelect
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
