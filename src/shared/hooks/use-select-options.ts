import { useState, useCallback } from "react";
import type { DefaultOptionType } from "antd/es/select";

export const useSelectOptions = () => {
	const [optionsMap, setOptionsMap] = useState<
		Record<string, DefaultOptionType[]>
	>({});

	const loadOption = useCallback(
		(fieldName: string, item: any | undefined | null) => {
			if (!item) return null;

			const option = {
				label: item.label || item.name,
				value: item.value || item.uuid || item.id,
			};

			setOptionsMap((prev) => ({
				...prev,
				[fieldName]: [option],
			}));

			return option.value;
		},
		[],
	);

	return {
		optionsMap,
		loadOption,
	};
};
