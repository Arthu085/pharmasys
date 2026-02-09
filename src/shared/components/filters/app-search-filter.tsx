import { useState, useEffect } from "react";
import { Flex, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import { AppInput } from "../inputs/app-input";

const { Text } = Typography;

interface AppSearchFilterProps {
	value?: string;
	onChange: (value: string) => void;
	placeholder?: string;
	label?: string;
	width?: number | string;
	delay?: number;
	size?: SizeType;
}

export const AppSearchFilter = ({
	value,
	onChange,
	placeholder = "Buscar...",
	label = "Busca",
	width = "100%",
	delay = 600,
	size = "middle",
}: AppSearchFilterProps) => {
	const [localValue, setLocalValue] = useState(value || "");

	useEffect(() => {
		setLocalValue(value || "");
	}, [value]);

	useEffect(() => {
		const timer = setTimeout(() => {
			if (localValue !== value) {
				onChange(localValue);
			}
		}, delay);

		return () => clearTimeout(timer);
	}, [localValue, delay, onChange, value]);

	return (
		<Flex vertical gap={4} style={{ width }}>
			{label && <Text strong>{label}</Text>}
			<AppInput
				prefix={<SearchOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
				placeholder={placeholder}
				value={localValue}
				onChange={(e) => setLocalValue(e.target.value)}
				allowClear
				size={size}
				style={{ width: "100%", height: 40 }}
			/>
		</Flex>
	);
};
