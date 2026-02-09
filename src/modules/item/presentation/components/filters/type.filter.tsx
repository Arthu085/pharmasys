import { Flex, Typography } from "antd";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import { AppSelect } from "@/shared/components/selects/app-select";
import {
	TypeEnum,
	TypeEnumTranslated,
} from "@/modules/item/domain/enums/type.enum";

const { Text } = Typography;

interface TypeFilterProps {
	value?: TypeEnum;
	onChange: (value?: TypeEnum) => void;
	width?: number | string;
	placeholder?: string;
	size?: SizeType;
}

const options = (Object.keys(TypeEnum) as Array<keyof typeof TypeEnum>).map(
	(key) => ({
		label: TypeEnumTranslated[key],
		value: TypeEnum[key],
	}),
);

export const TypeFilter = ({
	value,
	onChange,
	width = "100%",
	placeholder = "Buscar pelo tipo do item...",
	size = "middle",
}: TypeFilterProps) => {
	return (
		<Flex vertical gap={4} style={{ width }}>
			<Text strong>Tipo do Item</Text>
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
