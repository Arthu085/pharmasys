type FormatCurrencyOptions = {
	withSymbol?: boolean;
	decimals?: number;
};

export const formatCurrency = (
	value?: number | string | null,
	options: FormatCurrencyOptions = {},
): string => {
	const { withSymbol = false, decimals = 2 } = options;

	const amount = Number(value ?? 0);

	if (Number.isNaN(amount)) {
		return withSymbol ? "R$ 0,00" : "0,00";
	}

	const formatterOptions: Intl.NumberFormatOptions = {
		style: withSymbol ? "currency" : "decimal",
		currency: "BRL",
		minimumFractionDigits: decimals,
		maximumFractionDigits: decimals,
	};

	return amount.toLocaleString("pt-BR", formatterOptions);
};
