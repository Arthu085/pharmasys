import { useCallback } from "react";
import {
	AppAsyncSelect,
	type AppAsyncSelectProps,
	type FetchResult,
} from "../app-async-select";
import { StatusEnum } from "@/shared/domain/enums/status.enum";
import type { IStockLocationListData } from "@/modules/stock-location/domain/dtos/stock-location-list-response.dto";
import type { IStockLocationFilterDto } from "@/modules/stock-location/domain/dtos/stock-location-filter.dto";
import { stockLocationService } from "@/modules/stock-location/infrastructure/stock-location.service";

interface AppStockLocationSelectProps extends Omit<
	AppAsyncSelectProps<IStockLocationListData>,
	"fetchOptions" | "mapOption"
> {
	pageSize?: number;
}

export const AppStockLocationSelect = ({
	pageSize = 20,
	placeholder = "Selecione o local de estoque...",
	...rest
}: AppStockLocationSelectProps) => {
	const fetchStockLocations = useCallback(
		async ({
			search,
			page,
		}: {
			search: string;
			page: number;
		}): Promise<FetchResult<IStockLocationListData>> => {
			const filters: IStockLocationFilterDto = {
				page: page,
				limit: pageSize,
				name: search || undefined,
				status: StatusEnum.ATIVO,
			};

			const response = await stockLocationService.findAll(filters);

			if (!response.success || !response.data) {
				throw new Error(
					response.message || "Erro ao carregar locais de estoque",
				);
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
		<AppAsyncSelect<IStockLocationListData>
			placeholder={placeholder}
			fetchOptions={fetchStockLocations}
			mapOption={(stockLocation) => ({
				label: stockLocation.name,
				value: stockLocation.uuid,
			})}
			{...rest}
		/>
	);
};
