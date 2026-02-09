import { useCallback } from "react";
import {
	AppAsyncSelect,
	type AppAsyncSelectProps,
	type FetchResult,
} from "../app-async-select";
import { StatusEnum } from "@/shared/domain/enums/status.enum";
import type { IBatchListData } from "@/modules/batch/domain/dtos/batch-list-response.dto";
import { batchService } from "@/modules/batch/infrastructure/batch.service";
import type { IBatchFilterDto } from "@/modules/batch/domain/dtos/batch-filter.dto";

interface AppBatchSelectProps extends Omit<
	AppAsyncSelectProps<IBatchListData>,
	"fetchOptions" | "mapOption"
> {
	pageSize?: number;
}

export const AppBatchSelect = ({
	pageSize = 20,
	placeholder = "Selecione o lote...",
	...rest
}: AppBatchSelectProps) => {
	const fetchBatches = useCallback(
		async ({
			search,
			page,
		}: {
			search: string;
			page: number;
		}): Promise<FetchResult<IBatchListData>> => {
			const filters: IBatchFilterDto = {
				page: page,
				limit: pageSize,
				batchCode: search || undefined,
				status: StatusEnum.ATIVO,
			};

			const response = await batchService.findAll(filters);

			if (!response.success || !response.data) {
				throw new Error(response.message || "Erro ao carregar lotes");
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
		<AppAsyncSelect<IBatchListData>
			placeholder={placeholder}
			fetchOptions={fetchBatches}
			mapOption={(batch) => ({
				label: batch.batchCode,
				value: batch.uuid,
			})}
			{...rest}
		/>
	);
};
