import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { readFileSync } from "fs";

const pkg = JSON.parse(readFileSync("./package.json", "utf-8")) as {
	version?: string;
};

// https://vite.dev/config/
export default defineConfig({
	define: {
		__APP_VERSION__: JSON.stringify(pkg.version ?? "0.0.0"),
	},
	plugins: [react(), svgr()],
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
		watch: {
			usePolling: process.env.CHOKIDAR_USEPOLLING === "true",
			interval: 1000,
			binaryInterval: 3000,
		},
		hmr: {
			clientPort: process.env.VITE_HMR_CLIENT_PORT
				? Number(process.env.VITE_HMR_CLIENT_PORT)
				: undefined,
		},
	},
});
