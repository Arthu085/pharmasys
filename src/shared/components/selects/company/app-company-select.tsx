import type { SelectProps } from "antd";
import { StatusEnum } from "@/shared/domain/enums/status.enum";
import { companyService } from "@/modules/company/infrastructure/company.service";
import type { ICompanyListData } from "@/modules/company/domain/dtos/company-list-response.dto";
import type { ICompanyFilterDto } from "@/modules/company/domain/dtos/company-filter.dto";
import { AppAsyncSelect } from "../app-async-select";
import type { ZodSchema } from "@/shared/validation/antd-zod";

interface AppCompanySelectProps extends Omit<SelectProps, "options"> {
	name?: string;
	label?: string;
	zodSchema?: ZodSchema;
	placeholder?: string;
	onlyActive?: boolean;
	limit?: number;
}

export const AppCompanySelect = ({
	name,
	label,
	zodSchema,
	placeholder = "Selecione a empresa...",
	onlyActive = true,
	limit = 50,
	...rest
}: AppCompanySelectProps) => {
	return (
		<AppAsyncSelect
			name={name}
			label={label}
			zodSchema={zodSchema}
			placeholder={placeholder}
			allowClear
			fetchOnOpen
			fetchOnSearch
			minSearchLength={0}
			style={{ width: "100%" }}
			fetchOptions={async ({ search, page = 1 } = {}) => {
				const filters: ICompanyFilterDto = {
					page,
					limit,
					name: search || undefined,
					status: onlyActive ? StatusEnum.ATIVO : undefined,
				};

				const response = await companyService.findAll(filters);

				if (!response.success || !response.data) {
					throw new Error(response.message || "Erro ao carregar empresas");
				}

				const options = response.data.data.map((company: ICompanyListData) => ({
					label: company.name,
					value: company.uuid,
				}));

				const meta = response.data.meta;
				const nextHasMore = meta ? meta.page < meta.lastPage : false;

				return {
					options,
					hasMore: nextHasMore,
				};
			}}
			{...rest}
		/>
	);
};
