import { Flex, Typography } from "antd";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import {
	CompanyTypeEnum,
	CompanyTypeEnumTranslated,
} from "@/modules/company/domain/enums/company-type.enum";
import { AppSelect } from "@/shared/components/selects/app-select";

const { Text } = Typography;

interface CompanyTypeFilterProps {
	value?: CompanyTypeEnum;
	onChange: (value?: CompanyTypeEnum) => void;
	width?: number | string;
	placeholder?: string;
	size?: SizeType;
}

const options = (
	Object.keys(CompanyTypeEnum) as Array<keyof typeof CompanyTypeEnum>
).map((key) => ({
	label: CompanyTypeEnumTranslated[key],
	value: CompanyTypeEnum[key],
}));

export const CompanyTypeFilter = ({
	value,
	onChange,
	width = "100%",
	placeholder = "Filtrar por Tipo de Empresa",
	size = "middle",
}: CompanyTypeFilterProps) => {
	return (
		<Flex vertical gap={4} style={{ width }}>
			<Text strong>Tipo de Empresa</Text>
			<AppSelect
				placeholder={placeholder}
				style={{ width: "100%" }}
				value={value}
				onChange={onChange}
				options={options}
				size={size}
				allowClear
			/>
		</Flex>
	);
};
