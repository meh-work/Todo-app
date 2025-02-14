import axios from "axios"

// Base Urls
import { apiRequestBackend } from "../services/api"
import { backendBaseUrl } from "./baseUrl"

// Backend Routes
const adminDashboardBackendRoute = "/todos/admin"
const adminLoginBackendRoute = "admin/login"
const adminLogoutBackendRoute = "admin/logout"
const userLoginBackendRoute = "/users/login"
const userRegisterBackendRoute = "/users/register"
const userDashboardBackendRoute = "/todos"

// Frontend Routes
export const adminLoginFrontendRoute = "/admin-login"
export const adminDashboardFrontendRoute = "/admin-dashboard"
export const userLoginFrontendRoute = "/"
export const userRegisterFrontendRoute = "/register"
export const userDashboardFrontendRoute = "/dashboard"
export const userTodoEditFrontendRoute = "/edit-todo/:id"

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
    return data;
}

export const userFetchTodosRoute = async (token) => {
    const response = await apiRequestBackend("GET", userDashboardBackendRoute,token);
    return response;
}