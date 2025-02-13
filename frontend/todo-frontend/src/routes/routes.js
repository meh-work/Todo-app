import axios from "axios"
import { apiRequestBackend } from "../services/api"
import { backendBaseUrl } from "./baseUrl"
const userLoginBackendRoute = "/users/login"
const userRegisterBackendRoute = "/users/register"
const adminLoginBackendRoute = "admin/login"
const adminLogoutBackendRoute = "admin/logout"
export const adminLoginFrontendRoute = "/admin-login"
export const userLoginFrontendRoute = "/"
export const userRegisterFrontendRoute = "/register"
export const userDashboardFrontendRoute = "/dashboard"
const userDashboardBackendRoute = "/todos"
const adminDashboardBackendRoute = "/todos/admin"
export const adminDashboardFrontendRoute = "/admin-dashboard"

export const adminLoginRoute = async (loginData) => {  
    const {data} = await axios.post(`${backendBaseUrl}/${adminLoginBackendRoute}`,loginData)
    return data;
}

export const adminLogoutRoute = async (token) => {
    const data = await apiRequestBackend("POST", adminLogoutBackendRoute, token);
    return data;
}

export const adminFetchTodosRoute = async (page,token) => {
    const response = await apiRequestBackend("GET", `${adminDashboardBackendRoute}?page=${page}&limit=10`, token);
    return response;
}

export const userRegisterRoute = async (formData) => {
    const data = await apiRequestBackend("POST", userRegisterBackendRoute, formData)
    return data
}

export const userLoginRoute = async (formData) => {
    const data = await apiRequestBackend("POST", userLoginBackendRoute, formData)
    console.log(`Api data: ${JSON.stringify(data)}`);
    return data;
}

export const userFetchTodosRoute = async (token) => {
    const response = await apiRequestBackend("GET", userDashboardBackendRoute,token);
    console.log(`User todos: ${JSON.stringify(response)}`);
    
    return response;
}