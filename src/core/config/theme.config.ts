import type { ThemeConfig } from "antd";

export const antThemeConfig: ThemeConfig = {
	token: {
		colorPrimary: "#1677ff",
		borderRadius: 6,
		fontFamily: "Inter, sans-serif",
	},
	components: {
		Button: {
			fontWeight: 500,
		},
		Input: {
			controlHeight: 40,
		},
	},
};
