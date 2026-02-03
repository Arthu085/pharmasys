import React, {
	useMemo,
	useRef,
	useState,
	useEffect,
	useCallback,
} from "react";
import { Form, Select, Spin, Empty, type SelectProps } from "antd";
import debounce from "lodash.debounce";
import { createZodRule, type ZodSchema } from "@/shared/validation/antd-zod";

export interface FetchResult<T> {
	data: T[];
	hasMore: boolean;
}

export interface AppAsyncSelectProps<T = any> extends Omit<
	SelectProps,
	"options" | "onSearch" | "filterOption" | "notFoundContent"
> {
	fetchOptions: (params: {
		search: string;
		page: number;
	}) => Promise<FetchResult<T>>;
	mapOption: (item: T) => { label: React.ReactNode; value: string | number };
	debounceTime?: number;
	name?: string;
	label?: string;
	zodSchema?: ZodSchema;
	options?: SelectProps["options"];
}

export const AppAsyncSelect = <T,>({
	fetchOptions,
	mapOption,
	debounceTime = 800,
	showSearch: showSearchProp,
	name,
	label,
	zodSchema,
	className,
	options: initialOptions,
	...props
}: AppAsyncSelectProps<T>) => {
	const [options, setOptions] = useState<SelectProps["options"]>(
		initialOptions || [],
	);
	const [fetching, setFetching] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const pageRef = useRef(1);
	const searchRef = useRef("");
	const fetchIdRef = useRef(0);
	const mountedRef = useRef(false);
	const fetchOptionsRef = useRef(fetchOptions);
	const hasFetchedOnceRef = useRef(false);

	useEffect(() => {
		if (initialOptions) {
			setOptions(initialOptions);
		}
	}, [initialOptions]);

	useEffect(() => {
		fetchOptionsRef.current = fetchOptions;
	}, [fetchOptions]);

	const loadData = useCallback(
		async (search: string, page: number, isScrolling = false) => {
			fetchIdRef.current += 1;
			const currentFetchId = fetchIdRef.current;

			setFetching(true);

			try {
				const { data, hasMore: moreExists } = await fetchOptionsRef.current({
					search,
					page,
				});

				if (currentFetchId !== fetchIdRef.current) return;

				const newOptions = data.map(mapOption);

				hasFetchedOnceRef.current = true;

				if (isScrolling) {
					setOptions((prev) => [...(prev || []), ...newOptions]);
				} else {
					setOptions(newOptions);
				}

				setHasMore(moreExists);
			} catch (error) {
				console.error("Erro ao buscar dados:", error);
			} finally {
				if (currentFetchId === fetchIdRef.current) {
					setFetching(false);
				}
			}
		},
		[mapOption],
	);

	const debouncedSearch = useMemo(() => {
		const run = (value: string) => {
			searchRef.current = value;
			pageRef.current = 1;
			loadData(value, 1, false);
		};
		return debounce(run, debounceTime);
	}, [loadData, debounceTime]);

	useEffect(() => {
		mountedRef.current = true;
		return () => {
			mountedRef.current = false;
			debouncedSearch.cancel();
		};
	}, [debouncedSearch]);

	const handlePopupScroll = async (e: React.UIEvent<HTMLDivElement>) => {
		const target = e.target as HTMLDivElement;

		const isBottom =
			Math.abs(target.scrollHeight - (target.scrollTop + target.offsetHeight)) <
			10;

		if (isBottom && hasMore && !fetching) {
			pageRef.current += 1;
			await loadData(searchRef.current, pageRef.current, true);
		}

		props.onPopupScroll?.(e);
	};

	const handleOnOpenChange = (open: boolean) => {
		if (open && !hasFetchedOnceRef.current && mountedRef.current) {
			pageRef.current = 1;
			loadData("", 1, false);
		}
		props.onOpenChange?.(open);
	};

	const getShowSearchConfig = useCallback((): SelectProps["showSearch"] => {
		const baseConfig = typeof showSearchProp === "object" ? showSearchProp : {};

		return {
			...baseConfig,
			filterOption: false,
			onSearch: debouncedSearch,
		};
	}, [showSearchProp, debouncedSearch]);

	const renderNotFoundContent = useCallback(() => {
		if (fetching && pageRef.current === 1) {
			return <Spin size="small" />;
		}
		return <Empty description="Sem dados" />;
	}, [fetching]);

	const renderDropdown = useCallback(
		(menu: React.ReactNode) => {
			return (
				<>
					{menu}
					{fetching && pageRef.current > 1 && (
						<div style={{ padding: "8px", textAlign: "center" }}>
							<Spin size="small" />
						</div>
					)}
				</>
			);
		},
		[fetching],
	);

	const selectNode = (
		<Select
			style={{ width: "100%", height: 40, ...props.style }}
			className={className}
			showSearch={getShowSearchConfig()}
			loading={fetching}
			options={options}
			onPopupScroll={handlePopupScroll}
			onOpenChange={handleOnOpenChange}
			allowClear
			notFoundContent={renderNotFoundContent()}
			popupRender={renderDropdown}
			{...props}
		/>
	);

	if (!name) {
		return selectNode;
	}

	const rules = zodSchema ? [createZodRule(zodSchema)] : undefined;

	return (
		<Form.Item
			name={name}
			label={label}
			rules={rules}
			required={!!zodSchema}
			validateTrigger={["onChange", "onBlur"]}>
			{selectNode}
		</Form.Item>
	);
};
