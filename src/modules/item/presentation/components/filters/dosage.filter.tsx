import { Flex, Typography } from "antd";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import { AppSelect } from "@/shared/components/selects/app-select";
import {
	DosageEnum,
	DosageEnumTranslated,
} from "@/modules/item/domain/enums/dosage.enum";

const { Text } = Typography;

interface DosageFilterProps {
	value?: DosageEnum;
	onChange: (value?: DosageEnum) => void;
	width?: number | string;
	placeholder?: string;
	size?: SizeType;
}

const options = (Object.keys(DosageEnum) as Array<keyof typeof DosageEnum>).map(
	(key) => ({
		label: DosageEnumTranslated[key],
		value: DosageEnum[key],
	}),
);

export const DosageFilter = ({
	value,
	onChange,
	width = "100%",
	placeholder = "Buscar pela dosagem do item...",
	size = "middle",
}: DosageFilterProps) => {
	return (
		<Flex vertical gap={4} style={{ width }}>
			<Text strong>Dosagem do Item</Text>
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
