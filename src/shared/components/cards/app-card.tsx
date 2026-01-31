import { Card, Flex, theme, Typography, type CardProps } from "antd";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

interface AppCardProps extends CardProps {
	to?: string;
	icon?: ReactNode;
	iconColor?: string;
	subtitle?: string;
}

export const AppCard = ({
	to,
	icon,
	iconColor = "#1677ff",
	subtitle,
	children,
	style,
	...rest
}: AppCardProps) => {
	const navigate = useNavigate();
	const { token } = theme.useToken();

	const isInteractive = !!to || rest.hoverable;

	const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (rest.onClick) rest.onClick(e);
		if (to) navigate(to);
	};

	const renderContent = () => {
		if (icon) {
			return (
				<Flex align="center" gap={16}>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							width: 48,
							height: 48,
							borderRadius: token.borderRadiusLG,
							backgroundColor: `${iconColor}1a`,
							color: iconColor,
							fontSize: 24,
							flexShrink: 0,
						}}>
						{icon}
					</div>
					<Flex vertical>
						{rest.title && (
							<Title level={5} style={{ margin: 0 }}>
								{rest.title}
							</Title>
						)}
						{subtitle && <Text type="secondary">{subtitle}</Text>}
						{children}
					</Flex>
				</Flex>
			);
		}
		return children;
	};

	return (
		<Card
			{...rest}
			title={icon ? undefined : rest.title}
			hoverable={isInteractive}
			onClick={isInteractive ? handleClick : undefined}
			style={{
				cursor: isInteractive ? "pointer" : "default",
				height: "100%",
				...style,
			}}>
			{renderContent()}
		</Card>
	);
};
