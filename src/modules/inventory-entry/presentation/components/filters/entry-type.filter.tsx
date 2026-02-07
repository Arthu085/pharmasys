import { Flex, Typography } from "antd";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import { AppSelect } from "@/shared/components/selects/app-select";
import {
	EntryTypeEnum,
	EntryTypeEnumTranslated,
} from "@/modules/inventory-entry/domain/enums/entry-type.enum";

const { Text } = Typography;

interface EntryTypeFilterProps {
	value?: EntryTypeEnum;
	onChange: (value?: EntryTypeEnum) => void;
	width?: number | string;
	placeholder?: string;
	size?: SizeType;
}

const options = (
	Object.keys(EntryTypeEnum) as Array<keyof typeof EntryTypeEnum>
).map((key) => ({
	label: EntryTypeEnumTranslated[key],
	value: EntryTypeEnum[key],
}));

export const EntryTypeFilter = ({
	value,
	onChange,
	width = "100%",
	placeholder = "Buscar pelo tipo de entrada...",
	size = "middle",
}: EntryTypeFilterProps) => {
	return (
		<Flex vertical gap={4} style={{ width }}>
			<Text strong>Tipo de Entrada</Text>
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
