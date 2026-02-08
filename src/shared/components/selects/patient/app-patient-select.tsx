import { useCallback } from "react";
import {
	AppAsyncSelect,
	type AppAsyncSelectProps,
	type FetchResult,
} from "../app-async-select";
import { StatusEnum } from "@/shared/domain/enums/status.enum";
import type { IPatientListData } from "@/modules/patient/domain/dtos/patient-list-response.dto";
import type { IPatientFilterDto } from "@/modules/patient/domain/dtos/patient-filter.dto";
import { patientService } from "@/modules/patient/infrastructure/patient.service";

interface AppPatientSelectProps extends Omit<
	AppAsyncSelectProps<IPatientListData>,
	"fetchOptions" | "mapOption"
> {
	pageSize?: number;
}

export const AppPatientSelect = ({
	pageSize = 20,
	placeholder = "Selecione o paciente...",
	...rest
}: AppPatientSelectProps) => {
	const fetchPatients = useCallback(
		async ({
			search,
			page,
		}: {
			search: string;
			page: number;
		}): Promise<FetchResult<IPatientListData>> => {
			const filters: IPatientFilterDto = {
				page: page,
				limit: pageSize,
				name: search || undefined,
				status: StatusEnum.ATIVO,
			};

			const response = await patientService.findAll(filters);

			if (!response.success || !response.data) {
				throw new Error(response.message || "Erro ao carregar pacientes");
			}

			const { data, meta } = response.data;

			const hasMore = meta ? meta.page < meta.lastPage : false;

			return {
				data,
				hasMore,
			};
		},
		[pageSize],
	);

	return (
		<AppAsyncSelect<IPatientListData>
			placeholder={placeholder}
			fetchOptions={fetchPatients}
			mapOption={(patient) => ({
				label: patient.name,
				value: patient.uuid,
			})}
			{...rest}
		/>
	);
};
