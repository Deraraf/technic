import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, "", "");
  return {
    plugins: [react()],
    server: {
      port: 5173,
      // conditionally importing the backend url if https://technic.onrender.com use it or else use http://localhost:5000
      proxy: {
        "/api": {
          target:
            mode === "production"
              ? env.VITE_BACKEND_URL_PROD
              : env.VITE_BACKEND_URL_DEV,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
      middlewareMode: false,
      historyApiFallback: true,
    },
  };
});
