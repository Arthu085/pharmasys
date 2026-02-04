import { Flex, Typography } from "antd";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import { AppSelect } from "@/shared/components/selects/app-select";
import {
	PresentationEnum,
	PresentationEnumTranslated,
} from "@/modules/item/domain/enums/presentation.enum";

const { Text } = Typography;

interface PresentationFilterProps {
	value?: PresentationEnum;
	onChange: (value?: PresentationEnum) => void;
	width?: number | string;
	placeholder?: string;
	size?: SizeType;
}

const options = (
	Object.keys(PresentationEnum) as Array<keyof typeof PresentationEnum>
).map((key) => ({
	label: PresentationEnumTranslated[key],
	value: PresentationEnum[key],
}));

export const PresentationFilter = ({
	value,
	onChange,
	width = "100%",
	placeholder = "Buscar pela apresentação do item...",
	size = "middle",
}: PresentationFilterProps) => {
	return (
		<Flex vertical gap={4} style={{ width }}>
			<Text strong>Apresentação do Item</Text>
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
