import dayjs from "dayjs";
import "dayjs/locale/pt-br";

dayjs.locale("pt-br");

export const formatDate = (
	date: string | Date | null | undefined,
	format = "DD/MM/YYYY HH:mm",
): string => {
	if (!date) return "-";
	return dayjs(date).format(format);
};
