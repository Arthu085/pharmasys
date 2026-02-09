import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Flex, Form, Typography } from "antd";
import type { FormListFieldData } from "antd/es/form/FormList";
import React from "react";
import { AppCard } from "../cards/app-card";
import { AppButton } from "../buttons/app-button";

const { Text, Title } = Typography;
const { List } = Form;

interface AppFormListProps {
	name: string;
	label?: string;
	addButtonLabel?: string;
	initialValue?: Record<string, any>;
	renderItem: (field: FormListFieldData, index: number) => React.ReactNode;
	minItems?: number;
}

export const AppFormList = ({
	name,
	label,
	addButtonLabel = "Adicionar item",
	initialValue = {},
	renderItem,
	minItems = 0,
}: AppFormListProps) => {
	return (
		<Flex vertical gap={"small"}>
			{label && <Title level={5}>{label}</Title>}
			<List name={name}>
				{(fields, { add, remove }) => (
					<>
						{fields.map((field, index) => (
							<AppCard key={field.key} size="small">
								<Flex vertical gap={"middle"}>
									<Flex justify="space-between" align="center">
										<Text strong type="secondary">
											#{index + 1}
										</Text>
										<AppButton
											type="text"
											danger
											size="small"
											icon={<DeleteOutlined />}
											onClick={() => remove(field.name)}
											disabled={fields.length <= minItems}>
											Remover
										</AppButton>
									</Flex>
									{renderItem(field, index)}
								</Flex>
							</AppCard>
						))}
						<AppButton
							type="dashed"
							block
							icon={<PlusOutlined />}
							onClick={() => add(initialValue)}>
							{addButtonLabel}
						</AppButton>
					</>
				)}
			</List>
		</Flex>
	);
};
