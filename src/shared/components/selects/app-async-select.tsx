import { useCallback, useRef, useState } from "react";
import { Form, Select, Spin, message, type SelectProps } from "antd";
import type { DefaultOptionType } from "antd/es/select";
import { createZodRule, type ZodSchema } from "@/shared/validation/antd-zod";

type FetchOptionsParams = {
	search?: string;
	page?: number;
};

type FetchOptionsResult =
	| DefaultOptionType[]
	| {
			options: DefaultOptionType[];
			hasMore?: boolean;
	  };

interface AppAsyncSelectProps extends Omit<
	SelectProps,
	"options" | "loading" | "filterOption" | "onSearch"
> {
	name?: string;
	label?: string;
	zodSchema?: ZodSchema;
	fetchOptions: (params?: FetchOptionsParams) => Promise<FetchOptionsResult>;
	fetchOnOpen?: boolean;
	fetchOnSearch?: boolean;
	debounceMs?: number;
	minSearchLength?: number;
	enableInfiniteScroll?: boolean;
}

export const AppAsyncSelect = ({
	name,
	label,
	zodSchema,
	className,
	fetchOptions,
	fetchOnOpen = true,
	fetchOnSearch = true,
	debounceMs = 400,
	minSearchLength = 0,
	enableInfiniteScroll = true,
	onPopupVisibleChange,
	showSearch,
	style,
	onPopupScroll,
	onFocus,
	onClick,
	...rest
}: AppAsyncSelectProps) => {
	const rules = zodSchema ? [createZodRule(zodSchema)] : undefined;

	const [options, setOptions] = useState<DefaultOptionType[]>([]);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(false);
	const hasLoadedOnce = useRef(false);
	const currentPage = useRef(1);
	const currentSearch = useRef<string | undefined>(undefined);
	const debounceTimer = useRef<number | undefined>(undefined);

	const loadPage = useCallback(
		async (params?: { search?: string; page?: number; append?: boolean }) => {
			const search = params?.search;
			const page = params?.page ?? 1;
			const append = params?.append ?? false;

			try {
				setLoading(true);
				const result = await fetchOptions({ search, page });
				const nextOptions = Array.isArray(result) ? result : result.options;
				const nextHasMore = Array.isArray(result) ? false : !!result.hasMore;

				setOptions((prev) =>
					append ? [...prev, ...nextOptions] : nextOptions,
				);
				setHasMore(nextHasMore);
				hasLoadedOnce.current = true;
				currentPage.current = page;
				currentSearch.current = search;
			} catch (error) {
				message.error("Não foi possível carregar as opções");
				if (!append) setOptions([]);
				setHasMore(false);
			} finally {
				setLoading(false);
			}
		},
		[fetchOptions],
	);

	const resolvedShowSearch: SelectProps["showSearch"] = fetchOnSearch
		? {
				...(typeof showSearch === "object" ? showSearch : {}),
				filterOption: false,
				onSearch: (search: string) => {
					if (typeof showSearch === "object") {
						showSearch.onSearch?.(search);
					}

					if (search.length < minSearchLength) return;

					if (debounceTimer.current) {
						window.clearTimeout(debounceTimer.current);
					}

					debounceTimer.current = window.setTimeout(() => {
						loadPage({ search, page: 1, append: false });
					}, debounceMs);
				},
			}
		: showSearch;

	const selectNode = (
		<Select
			className={className}
			style={{ height: 40, ...(style || {}) }}
			options={options}
			loading={loading}
			notFoundContent={loading ? <Spin size="small" /> : undefined}
			onFocus={(e) => {
				onFocus?.(e);
				if (!fetchOnOpen) return;
				if (hasLoadedOnce.current) return;
				loadPage({ page: 1, append: false });
			}}
			onClick={(e) => {
				onClick?.(e);
				if (!fetchOnOpen) return;
				if (hasLoadedOnce.current) return;
				loadPage({ page: 1, append: false });
			}}
			onPopupVisibleChange={(open) => {
				onPopupVisibleChange?.(open);
				if (!open) return;
				if (!fetchOnOpen) return;
				if (hasLoadedOnce.current) return;
				loadPage({ page: 1, append: false });
			}}
			onPopupScroll={(e) => {
				onPopupScroll?.(e);
				if (!enableInfiniteScroll) return;
				if (!hasLoadedOnce.current) return;
				if (loading) return;
				if (!hasMore) return;

				const target = e.target as HTMLElement;
				const nearBottom =
					target.scrollTop + target.clientHeight >= target.scrollHeight - 24;
				if (!nearBottom) return;

				loadPage({
					search: currentSearch.current,
					page: currentPage.current + 1,
					append: true,
				});
			}}
			showSearch={resolvedShowSearch}
			{...rest}
		/>
	);

	if (!name) {
		return selectNode;
	}

	return (
		<Form.Item name={name} label={label} rules={rules} required={!!zodSchema}>
			{selectNode}
		</Form.Item>
	);
};
