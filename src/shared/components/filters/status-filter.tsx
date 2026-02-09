import { Flex, Typography } from "antd";
import {
	StatusEnum,
	StatusEnumTranslated,
} from "@/shared/domain/enums/status.enum";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import { AppSelect } from "../selects/app-select";

const { Text } = Typography;

interface StatusFilterProps {
	value?: StatusEnum;
	onChange: (value?: StatusEnum) => void;
	width?: number | string;
	placeholder?: string;
	size?: SizeType;
}

const options = (Object.keys(StatusEnum) as Array<keyof typeof StatusEnum>).map(
	(key) => ({
		label: StatusEnumTranslated[key],
		value: StatusEnum[key],
	}),
);

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
			<AppSelect
				placeholder={placeholder}
				style={{ width: "100%", height: 40 }}
				value={value}
				onChange={onChange}
				options={options}
				size={size}
				allowClear={false}
			/>
		</Flex>
	);
};
