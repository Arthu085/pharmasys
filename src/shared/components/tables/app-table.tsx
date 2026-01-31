import { Empty, Grid, Table, type TableProps } from "antd";

interface AppTableProps<T> extends TableProps<T> {
	rowKey?: string | ((record: T) => string);
	emptyMessage?: string;
}

export const AppTable = <T extends object>({
	columns,
	dataSource,
	loading,
	rowKey = "uuid",
	pagination,
	emptyMessage = "Nenhum registro encontrado",
	...rest
}: AppTableProps<T>) => {
	const screens = Grid.useBreakpoint();
	const isMobile = screens.xs && !screens.sm;

	return (
		<Table
			columns={columns}
			dataSource={dataSource}
			loading={loading}
			rowKey={rowKey}
			size={isMobile ? "small" : "middle"}
			scroll={{ x: "max-content" }}
			locale={{
				emptyText: (
					<Empty
						image={Empty.PRESENTED_IMAGE_SIMPLE}
						description={emptyMessage}
					/>
				),
			}}
			pagination={
				pagination !== false
					? {
							showSizeChanger: !isMobile,
							pageSizeOptions: ["10", "20", "50"],
							showTotal: isMobile
								? undefined
								: (total) => `Total de ${total} registros`,
							...pagination,
						}
					: false
			}
			{...rest}
		/>
	);
};
