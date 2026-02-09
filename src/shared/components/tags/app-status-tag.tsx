import { Tag } from "antd";
import type { ReactNode } from "react";
import { StatusEnum } from "@/shared/domain/enums/status.enum";

type StatusObject = {
	value?: StatusEnum | string;
	label?: ReactNode;
};

export interface AppStatusTagProps {
	status?: StatusObject | StatusEnum | string | null;
	activeColor?: string;
	inactiveColor?: string;
	placeholder?: ReactNode;
}

export const AppStatusTag = ({
	status,
	activeColor = "success",
	inactiveColor = "error",
	placeholder = "-",
}: AppStatusTagProps) => {
	if (!status) {
		return <>{placeholder}</>;
	}

	const value = typeof status === "object" ? status.value : status;
	const label = typeof status === "object" ? status.label : status;

	const isActive = value === StatusEnum.ATIVO;
	const text = label ?? value ?? placeholder;

	return <Tag color={isActive ? activeColor : inactiveColor}>{text}</Tag>;
};
