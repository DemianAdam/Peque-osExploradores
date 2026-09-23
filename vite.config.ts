import { defineConfig, ServerOptions } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "fs";

const serverConfig = (): ServerOptions | undefined => {
  switch (process.env.VITE_SERVE) {
    case "local":
      return {
        host: true,
        https: {
          key: fs.readFileSync("./.cert/key.pem"),
          cert: fs.readFileSync("./.cert/cert.pem"),
        },
      };
    case "ngrok":
      return {
        allowedHosts: true as const,
      };
    default:
      return undefined;
  }
};

  export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@features": path.resolve(__dirname, "./src/features"),
        "@shared": path.resolve(__dirname, "./src/shared"),
        "@ui": path.resolve(__dirname, "./src/shared/ui"),
        "@hooks": path.resolve(__dirname, "./src/shared/hooks"),
        "@utils": path.resolve(__dirname, "./src/shared/utils"),
        "@convex": path.resolve(__dirname, "./convex"),
      },
    },
    server: serverConfig(),
  })
