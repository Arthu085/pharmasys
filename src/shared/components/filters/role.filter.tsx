import { Flex, Select, Typography } from "antd";
import { RoleEnum, RoleEnumTranslated } from "@/shared/domain/enums/role.enum";
import type { SizeType } from "antd/es/config-provider/SizeContext";

const { Text } = Typography;

interface RoleFilterProps {
	value?: RoleEnum;
	onChange: (value?: RoleEnum) => void;
	width?: number | string;
	placeholder?: string;
	size?: SizeType;
}

const options = [
	{ label: RoleEnumTranslated.ADMIN, value: RoleEnum.ADMIN },
	{ label: RoleEnumTranslated.FARMACEUTICO, value: RoleEnum.FARMACEUTICO },
	{ label: RoleEnumTranslated.OPERADOR, value: RoleEnum.OPERADOR },
];

export const RoleFilter = ({
	value,
	onChange,
	width = "100%",
	placeholder = "Filtrar por Função",
	size = "middle",
}: RoleFilterProps) => {
	return (
		<Flex vertical gap={4} style={{ width }}>
			<Text strong>Função</Text>
			<Select
				placeholder={placeholder}
				style={{ width: "100%" }}
				value={value}
				onChange={onChange}
				options={options}
				allowClear
				size={size}
			/>
		</Flex>
	);
};
