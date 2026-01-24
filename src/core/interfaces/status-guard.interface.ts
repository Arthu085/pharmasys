import type { StatusEnum } from "@/shared/domain/enums/status.enum";
import type { ReactNode } from "react";

export interface IStatusGuardProps {
	allowedStatus: StatusEnum;
	children?: ReactNode;
}
