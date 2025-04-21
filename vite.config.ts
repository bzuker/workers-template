import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
	plugins: [
		TanStackRouterVite({
			target: "react",
			autoCodeSplitting: true,
			routesDirectory: "./src/client/routes",
			generatedRouteTree: "./src/client/routeTree.gen.ts",
		}),
		react(),
		tailwindcss(),
		cloudflare(),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src/client"),
		},
	},
});
