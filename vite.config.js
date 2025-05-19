import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	plugins: [react()],
	base: "./",
	build: {
		outDir: "dist-react",
		rollupOptions: {
			external: ["electron", "fs", "path"],
			input: {
				main: resolve(__dirname, "index.html"),
				secondWindow: resolve(__dirname, "secondWindow.html"),
			},
		},
	},
	optimizeDeps: {
		exclude: ["electron", "fs", "path"],
	},
});
