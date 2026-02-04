import { Flex, Typography } from "antd";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import { AppSelect } from "@/shared/components/selects/app-select";
import {
	SubtypeEnum,
	SubtypeEnumTranslated,
} from "@/modules/item/domain/enums/subtype.enum";

const { Text } = Typography;

interface SubtypeFilterProps {
	value?: SubtypeEnum;
	onChange: (value?: SubtypeEnum) => void;
	width?: number | string;
	placeholder?: string;
	size?: SizeType;
}

const options = (
	Object.keys(SubtypeEnum) as Array<keyof typeof SubtypeEnum>
).map((key) => ({
	label: SubtypeEnumTranslated[key],
	value: SubtypeEnum[key],
}));

export const SubtypeFilter = ({
	value,
	onChange,
	width = "100%",
	placeholder = "Buscar pelo subtipo do item...",
	size = "middle",
}: SubtypeFilterProps) => {
	return (
		<Flex vertical gap={4} style={{ width }}>
			<Text strong>Subtipo do Item</Text>
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
