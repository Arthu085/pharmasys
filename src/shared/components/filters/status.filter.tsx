import { Flex, Select, Typography } from "antd";
import {
	StatusEnum,
	StatusEnumTranslated,
} from "@/shared/domain/enums/status.enum";
import type { SizeType } from "antd/es/config-provider/SizeContext";

const { Text } = Typography;

interface StatusFilterProps {
	value?: StatusEnum;
	onChange: (value?: StatusEnum) => void;
	width?: number | string;
	placeholder?: string;
	size?: SizeType;
}

const options = [
	{ label: StatusEnumTranslated.ATIVO, value: StatusEnum.ATIVO },
	{ label: StatusEnumTranslated.INATIVO, value: StatusEnum.INATIVO },
];

export const StatusFilter = ({
	value,
	onChange,
	width = "100%",
	placeholder = "Filtrar por Status",
	size = "middle",
}: StatusFilterProps) => {
	return (
		<Flex vertical gap={4} style={{ width }}>
			<Text strong>Status</Text>
			<Select
				placeholder={placeholder}
				style={{ width: "100%" }}
				value={value}
				onChange={onChange}
				options={options}
				size={size}
			/>
		</Flex>
	);
};
