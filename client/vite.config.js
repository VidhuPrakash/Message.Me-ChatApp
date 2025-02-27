import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd()); // Load environment variables

  return {
    plugins: [react()],
    server: {
      port: 3000,
      proxy: {
        "/api": {
          target: env.VITE_BACKEND_URI || "http://localhost:3001",
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
