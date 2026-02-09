import { Flex, Typography } from "antd";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import { AppSelect } from "@/shared/components/selects/app-select";
import {
	TransferReasonEnum,
	TransferReasonEnumTranslated,
} from "@/modules/transfer-request/domain/enums/transfer-reason.enum";

const { Text } = Typography;

interface TransferReasonFilterProps {
	value?: TransferReasonEnum;
	onChange: (value?: TransferReasonEnum) => void;
	width?: number | string;
	placeholder?: string;
	size?: SizeType;
}

const options = (
	Object.keys(TransferReasonEnum) as Array<keyof typeof TransferReasonEnum>
).map((key) => ({
	label: TransferReasonEnumTranslated[key],
	value: TransferReasonEnum[key],
}));

export const TransferReasonFilter = ({
	value,
	onChange,
	width = "100%",
	placeholder = "Buscar pelo motivo da transferência...",
	size = "middle",
}: TransferReasonFilterProps) => {
	return (
		<Flex vertical gap={4} style={{ width }}>
			<Text strong>Motivo da Transferência</Text>
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
