import { Descriptions, Tag } from "antd";
import { AppModal } from "@/shared/components/modals/app-modal";
import { useFetchModal } from "@/shared/hooks/use-fetch-modal";
import { StatusEnum } from "@/shared/domain/enums/status.enum";
import { formatDate } from "@/shared/utils/date.util";
import type { IDetailsProps } from "@/shared/domain/interfaces/details.interface";
import type { IStockLocationDetailsData } from "../../domain/dtos/stock-location-details-response.dto";
import { stockLocationService } from "../../infrastructure/stock-location.service";

export const StockLocationDetails = ({
	open,
	onClose,
	uuid,
}: IDetailsProps) => {
	const { loading, data: stockLocation } =
		useFetchModal<IStockLocationDetailsData>(
			uuid,
			open,
			stockLocationService.findOne,
			onClose,
		);

	return (
		<AppModal
			title="Detalhes do Local de Estoque"
			open={open}
			onCancel={onClose}
			hideFooter
			loading={loading}>
			{stockLocation ? (
				<Descriptions column={1} bordered size="small" layout="horizontal">
					<Descriptions.Item label="Nome">
						{stockLocation.name}
					</Descriptions.Item>
					<Descriptions.Item label="Código">
						{stockLocation.code}
					</Descriptions.Item>
					<Descriptions.Item label="Central">
						<Tag color={stockLocation.isCentralStock ? "green" : "red"}>
							{stockLocation.isCentralStock ? "Sim" : "Não"}
						</Tag>
					</Descriptions.Item>
					<Descriptions.Item label="Status">
						<Tag
							color={
								stockLocation.status.value === StatusEnum.ATIVO
									? "green"
									: "red"
							}>
							{stockLocation.status.label}
						</Tag>
					</Descriptions.Item>
					<Descriptions.Item label="Usário Criador">
						{stockLocation.userCreated || "-"}
					</Descriptions.Item>
					<Descriptions.Item label="Usário Atualizador">
						{stockLocation.userUpdated || "-"}
					</Descriptions.Item>
					<Descriptions.Item label="Data de Criação">
						{formatDate(stockLocation.createdAt) || "-"}
					</Descriptions.Item>
					<Descriptions.Item label="Data de Atualização">
						{formatDate(stockLocation.updatedAt) || "-"}
					</Descriptions.Item>
				</Descriptions>
			) : null}
		</AppModal>
	);
};
