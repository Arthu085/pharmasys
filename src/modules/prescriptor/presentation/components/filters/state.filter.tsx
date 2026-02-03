import { Flex, Typography } from "antd";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import { AppSelect } from "@/shared/components/selects/app-select";
import {
	UfEnum,
	UfEnumTranslated,
} from "@/modules/prescriptor/domain/enums/uf.enum";

const { Text } = Typography;

interface StateFilterProps {
	value?: UfEnum;
	onChange: (value?: UfEnum) => void;
	width?: number | string;
	placeholder?: string;
	size?: SizeType;
}

const options = (Object.keys(UfEnum) as Array<keyof typeof UfEnum>).map(
	(key) => ({
		label: UfEnumTranslated[key],
		value: UfEnum[key],
	}),
);

export const StateFilter = ({
	value,
	onChange,
	width = "100%",
	placeholder = "Buscar pelo estado...",
	size = "middle",
}: StateFilterProps) => {
	return (
		<Flex vertical gap={4} style={{ width }}>
			<Text strong>Estado</Text>
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
