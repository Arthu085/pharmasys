import { useCallback } from "react";
import {
	AppAsyncSelect,
	type AppAsyncSelectProps,
	type FetchResult,
} from "../app-async-select";
import { StatusEnum } from "@/shared/domain/enums/status.enum";
import type { IPrescriptorListData } from "@/modules/prescriptor/domain/dtos/prescriptor-list-response.dto";
import type { IPrescriptorFilterDto } from "@/modules/prescriptor/domain/dtos/prescriptor-filter.dto";
import { prescriptorService } from "@/modules/prescriptor/infrastructure/prescriptor.service";

interface AppPrescriptorSelectProps extends Omit<
	AppAsyncSelectProps<IPrescriptorListData>,
	"fetchOptions" | "mapOption"
> {
	pageSize?: number;
}

export const AppPrescriptorSelect = ({
	pageSize = 20,
	placeholder = "Selecione o prescriptor...",
	...rest
}: AppPrescriptorSelectProps) => {
	const fetchPrescriptors = useCallback(
		async ({
			search,
			page,
		}: {
			search: string;
			page: number;
		}): Promise<FetchResult<IPrescriptorListData>> => {
			const filters: IPrescriptorFilterDto = {
				page: page,
				limit: pageSize,
				name: search || undefined,
				status: StatusEnum.ATIVO,
			};

			const response = await prescriptorService.findAll(filters);

			if (!response.success || !response.data) {
				throw new Error(response.message || "Erro ao carregar prescriptors");
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
		<AppAsyncSelect<IPrescriptorListData>
			placeholder={placeholder}
			fetchOptions={fetchPrescriptors}
			mapOption={(prescriptor) => ({
				label: prescriptor.name,
				value: prescriptor.uuid,
			})}
			{...rest}
		/>
	);
};
