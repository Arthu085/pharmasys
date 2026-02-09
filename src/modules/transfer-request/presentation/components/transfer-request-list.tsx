import { useMemo } from "react";
import { AppTable } from "@/shared/components/tables/app-table";
import { Grid } from "antd";
import type { ITransferRequestProps } from "../../domain/interfaces/transfer-request.interface";
import { getTransferRequestColumns } from "./tables/transfer-request-columns";
import type { ITransferRequestListData } from "../../domain/dtos/transfer-request-list-response.dto";

export const TransferRequestList = ({
	transfersRequest,
	loading,
	total,
	onDetails,
	page,
	pageSize,
	onChangePage,
}: ITransferRequestProps) => {
	const screens = Grid.useBreakpoint();
	const isMobile = (screens.xs && !screens.sm) ?? false;

	const columns = useMemo(
		() =>
			getTransferRequestColumns({
				onDetails,
				isMobile,
			}),
		[onDetails, isMobile],
	);

	return (
		<AppTable<ITransferRequestListData>
			columns={columns}
			dataSource={transfersRequest}
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
