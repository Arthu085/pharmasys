import { Flex, Typography } from "antd";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import { AppSelect } from "@/shared/components/selects/app-select";
import {
	ExitTypeEnum,
	ExitTypeEnumTranslated,
} from "@/modules/inventory-exit/domain/enums/exit-type.enum";

const { Text } = Typography;

interface ExitTypeFilterProps {
	value?: ExitTypeEnum;
	onChange: (value?: ExitTypeEnum) => void;
	width?: number | string;
	placeholder?: string;
	size?: SizeType;
}

const options = (
	Object.keys(ExitTypeEnum) as Array<keyof typeof ExitTypeEnum>
).map((key) => ({
	label: ExitTypeEnumTranslated[key],
	value: ExitTypeEnum[key],
}));

export const ExitTypeFilter = ({
	value,
	onChange,
	width = "100%",
	placeholder = "Buscar pelo tipo de saída...",
	size = "middle",
}: ExitTypeFilterProps) => {
	return (
		<Flex vertical gap={4} style={{ width }}>
			<Text strong>Tipo de Saída</Text>
			<AppSelect
				placeholder={placeholder}
				style={{ width: "100%", height: 40 }}
				value={value}
				onChange={onChange}
				options={options}
				size={size}
				allowClear
				showSearch={{ optionFilterProp: "label" }}
			/>
		</Flex>
	);
};
