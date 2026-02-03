import { Flex, Typography } from "antd";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import { AppSelect } from "@/shared/components/selects/app-select";
import {
	AdviceEnum,
	AdviceEnumTranslated,
} from "@/modules/prescriptor/domain/enums/advice.enum";

const { Text } = Typography;

interface AdviceFilterProps {
	value?: AdviceEnum;
	onChange: (value?: AdviceEnum) => void;
	width?: number | string;
	placeholder?: string;
	size?: SizeType;
}

const options = (Object.keys(AdviceEnum) as Array<keyof typeof AdviceEnum>).map(
	(key) => ({
		label: AdviceEnumTranslated[key],
		value: AdviceEnum[key],
	}),
);

export const AdviceFilter = ({
	value,
	onChange,
	width = "100%",
	placeholder = "Buscar pelo conselho...",
	size = "middle",
}: AdviceFilterProps) => {
	return (
		<Flex vertical gap={4} style={{ width }}>
			<Text strong>Conselho</Text>
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
