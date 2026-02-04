type BuildEnumOptions<TEnum> = {
	only?: readonly TEnum[keyof TEnum][];
	exclude?: readonly TEnum[keyof TEnum][];
};

export function buildEnumHelpers<
	TEnum extends Record<string, string>,
	TTranslated extends Record<keyof TEnum, string>,
>(enumObj: TEnum, translated: TTranslated, options?: BuildEnumOptions<TEnum>) {
	let entries = Object.entries(enumObj) as [keyof TEnum, TEnum[keyof TEnum]][];

	if (options?.only) {
		entries = entries.filter(([, value]) => options.only!.includes(value));
	}

	if (options?.exclude) {
		entries = entries.filter(([, value]) => !options.exclude!.includes(value));
	}

	const values = entries.map(([, value]) => value);

	const optionsList = entries.map(([key, value]) => ({
		label: translated[key],
		value,
	}));

	return {
		values,
		options: optionsList,
	} as const;
}
