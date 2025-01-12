//conditionally importing the backend url if https://technic.onrender.com use it or else use http://localhost:5000
export const BASE_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL_PROD
    : import.meta.env.VITE_BACKEND_URL_DEV;
export const USERS_URL = "/api/users";
export const REQUESTS_URL = "/api/requests";
