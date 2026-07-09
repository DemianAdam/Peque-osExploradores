import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "fs";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server:
    process.env.VITE_SERVE === "true"
      ? {
          host: true,
          https: {
            key: fs.readFileSync("./.cert/key.pem"),
            cert: fs.readFileSync("./.cert/cert.pem"),
          },
        }
      : undefined,
});
