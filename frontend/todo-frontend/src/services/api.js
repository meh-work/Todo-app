import axios from "axios";
import { backendBaseUrl } from "../routes/baseUrl.js"

const api = axios.create({
  baseURL: backendBaseUrl,
});

export const apiRequestBackend = async (method, url , data = null, token = null) => {
  try {
    const authToken = token || localStorage.getItem("token");
    const config = {
      method,
      url,
      data,
      headers: token ? { authorization: `Bearer ${authToken}`} : {}
    }
    const response = await api(config);
    
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Something went wrong!"
  }
}

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
