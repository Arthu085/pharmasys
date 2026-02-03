import { useCallback } from "react";
import {
	AppAsyncSelect,
	type AppAsyncSelectProps,
	type FetchResult,
} from "../app-async-select"; // Caminho relativo
import { companyService } from "@/modules/company/infrastructure/company.service";
import { StatusEnum } from "@/shared/domain/enums/status.enum";
import type { ICompanyListData } from "@/modules/company/domain/dtos/company-list-response.dto";
import type { ICompanyFilterDto } from "@/modules/company/domain/dtos/company-filter.dto";

interface AppCompanySelectProps extends Omit<
	AppAsyncSelectProps<ICompanyListData>,
	"fetchOptions" | "mapOption"
> {
	pageSize?: number;
}

export const AppCompanySelect = ({
	pageSize = 20,
	placeholder = "Selecione a empresa...",
	...rest
}: AppCompanySelectProps) => {
	const fetchCompanies = useCallback(
		async ({
			search,
			page,
		}: {
			search: string;
			page: number;
		}): Promise<FetchResult<ICompanyListData>> => {
			const filters: ICompanyFilterDto = {
				page: page,
				limit: pageSize,
				name: search || undefined,
				status: StatusEnum.ATIVO,
			};

			const response = await companyService.findAll(filters);

			if (!response.success || !response.data) {
				throw new Error(response.message || "Erro ao carregar empresas");
			}

			const { data, meta } = response.data;

			const hasMore = meta ? meta.page < meta.lastPage : false;

			return {
				data,
				hasMore,
			};
		},
		[pageSize],
	);

	return (
		<AppAsyncSelect<ICompanyListData>
			placeholder={placeholder}
			fetchOptions={fetchCompanies}
			mapOption={(company) => ({
				label: company.name,
				value: company.uuid,
			})}
			{...rest}
		/>
	);
};
