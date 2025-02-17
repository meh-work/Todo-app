import axios from "axios";

// Base urls
import { apiRequestBackend } from "../services/api";
import { backendBaseUrl } from "./baseUrl";

// Backend routes
const adminLoginBackendRoute = "admin/login";
const adminLogoutBackendRoute = "admin/logout";
const adminDashboardBackendRoute = "/todos/admin";
const userLoginBackendRoute = "/users/login";
const userRegisterBackendRoute = "/users/register";
const userLogoutBackendRoute = "/users/logout";
const userDashboardBackendRoute = "/todos";
const userFetchUserProfileBackendRoute = "users/user-profile";

// Frontend routes
export const adminLoginFrontendRoute = "/admin-login";
export const adminDashboardFrontendRoute = "/admin-dashboard";
export const userLoginFrontendRoute = "/";
export const userRegisterFrontendRoute = "/register";
export const userDashboardFrontendRoute = "/dashboard";
export const userTodoEditFrontendRoute = "edit-todo/:id";
export const userViewProfileFrontendRoute = "/view-profile";

export const adminLoginRoute = async (loginData) => {
  const { data } = await axios.post(
    `${backendBaseUrl}/${adminLoginBackendRoute}`,
    loginData
  );
  return data;
};

export const adminLogoutRoute = async (token) => {
  const data = await apiRequestBackend("POST", adminLogoutBackendRoute, token);
  return data;
};

export const adminFetchTodosRoute = async (page, token) => {
  const response = await apiRequestBackend(
    "GET",
    `${adminDashboardBackendRoute}?page=${page}&limit=10`,
    token
  );
  return response;
};

export const userRegisterRoute = async (formData) => {
  const data = await apiRequestBackend(
    "POST",
    userRegisterBackendRoute,
    formData
  );
  return data;
};

export const userLoginRoute = async (formData) => {
  const data = await apiRequestBackend("POST", userLoginBackendRoute, formData);
  console.log(`Api data: ${JSON.stringify(data)}`);
  return data;
};

export const userLogoutRoute = async (token) => {
  const data = await apiRequestBackend("POST", userLogoutBackendRoute, token);
  console.log(`Logout data: ${JSON.stringify(data)}`);
  return data;
};

export const userFetchTodosRoute = async (token) => {
  const response = await apiRequestBackend(
    "GET",
    userDashboardBackendRoute,
    token
  );
  console.log(`User todos: ${JSON.stringify(response)}`);

  return response;
};

export const fetchUserProfile = async (token) => {
  const response = await apiRequestBackend(
    "GET",
    userFetchUserProfileBackendRoute,
    token
  );

  console.log("fetchUserProfile: ", response.data);

  return response;
};
