import { useMemo } from "react";
import { AppTable } from "@/shared/components/tables/app-table";
import { getItemDispensationColumns } from "./tables/item-dispensation-columns";
import { Grid } from "antd";
import type { IItemDispensationListData } from "../../domain/dtos/item-dispensation-list-response.dto";
import type { IItemDispensationListProps } from "../../domain/interfaces/item-dispensation-list.interface";

export const ItemDispensationList = ({
	itemsDispensation,
	loading,
	total,
	onDetails,
	page,
	pageSize,
	onChangePage,
}: IItemDispensationListProps) => {
	const screens = Grid.useBreakpoint();
	const isMobile = (screens.xs && !screens.sm) ?? false;

	const columns = useMemo(
		() =>
			getItemDispensationColumns({
				onDetails,
				isMobile,
			}),
		[onDetails, isMobile],
	);

	return (
		<AppTable<IItemDispensationListData>
			columns={columns}
			dataSource={itemsDispensation}
			loading={loading}
			pagination={{
				current: page,
				pageSize: pageSize,
				total: total,
				onChange: onChangePage,
			}}
			rowKey="uuid"
		/>
	);
};
