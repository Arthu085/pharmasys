import { useCallback } from "react";
import {
	AppAsyncSelect,
	type AppAsyncSelectProps,
	type FetchResult,
} from "../app-async-select";
import { StatusEnum } from "@/shared/domain/enums/status.enum";
import type { IItemListData } from "@/modules/item/domain/dtos/item-list-response.dto";
import type { IItemFilterDto } from "@/modules/item/domain/dtos/item-filter.dto";
import { itemService } from "@/modules/item/infrastructure/item.service";

interface AppItemSelectProps extends Omit<
	AppAsyncSelectProps<IItemListData>,
	"fetchOptions" | "mapOption"
> {
	pageSize?: number;
}

export const AppItemSelect = ({
	pageSize = 20,
	placeholder = "Selecione o item...",
	...rest
}: AppItemSelectProps) => {
	const fetchItems = useCallback(
		async ({
			search,
			page,
		}: {
			search: string;
			page: number;
		}): Promise<FetchResult<IItemListData>> => {
			const filters: IItemFilterDto = {
				page: page,
				limit: pageSize,
				name: search || undefined,
				status: StatusEnum.ATIVO,
			};

			const response = await itemService.findAll(filters);

			if (!response.success || !response.data) {
				throw new Error(response.message || "Erro ao carregar itens");
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
		<AppAsyncSelect<IItemListData>
			placeholder={placeholder}
			fetchOptions={fetchItems}
			mapOption={(item) => ({
				label: item.name,
				value: item.uuid,
			})}
			{...rest}
		/>
	);
};
