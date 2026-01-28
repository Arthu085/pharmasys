import { Empty, Table, type TableProps } from "antd";

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
	return (
		<Table
			columns={columns}
			dataSource={dataSource}
			loading={loading}
			rowKey={rowKey}
			size="middle"
			scroll={{ x: true }}
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
							showSizeChanger: true,
							pageSizeOptions: ["10", "20", "50"],
							showTotal: (total) => `Total de ${total} registros`,
							...pagination,
						}
					: false
			}
			{...rest}
		/>
	);
};
