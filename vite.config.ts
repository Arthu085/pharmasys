import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import checker from "vite-plugin-checker";
import { readFileSync } from "fs";

const pkg = JSON.parse(readFileSync("./package.json", "utf-8")) as {
	version?: string;
};

// https://vite.dev/config/
export default defineConfig({
	define: {
		__APP_VERSION__: JSON.stringify(pkg.version ?? "0.0.0"),
	},
	plugins: [
		react(),
		svgr(),
		checker({
			typescript: true,
			overlay: {
				initialIsOpen: false,
			},
		}),
	],
	resolve: {
		alias: {
			"@": "/src",
		},
	},
	base: "/",
	server: {
		host: true,
		port: 5173,
		strictPort: true,
		watch:
			process.env.CHOKIDAR_USEPOLLING === "true"
				? {
						usePolling: true,
						interval: 250,
					}
				: undefined,
		hmr: {
			clientPort: process.env.VITE_HMR_CLIENT_PORT
				? Number(process.env.VITE_HMR_CLIENT_PORT)
				: undefined,
		},
	},
});
