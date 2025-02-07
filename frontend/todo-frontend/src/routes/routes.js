import { apiRequestBackend } from "../services/api"

const userLoginBackendRoute = "/users/login"
const userRegisterBackendRoute = "/users/register"
const adminLoginBackendRoute = "admin/login"
export const adminLoginFrontendRoute = "/admin-login"
export const userLoginFrontendRoute = "/"
export const userRegisterFrontendRoute = "/register"
export const userDashboardFrontendRoute = "/dashboard"
const userDashboardBackendRoute = "/todos"
const adminDashboardBackendRoute = "/todos/admin"
export const adminDashboardFrontendRoute = "/admin-dashboard"

export const adminLoginRoute = async (formData) => {
    const data = await apiRequestBackend("POST", adminLoginBackendRoute, formData);
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
    const response = apiRequestBackend("GET", userDashboardBackendRoute,token);
    return response;
}