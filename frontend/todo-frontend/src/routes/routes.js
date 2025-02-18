import axios from "axios";

// Base urls
import { apiRequestBackend } from "../services/api";
import { backendBaseUrl } from "./baseUrl";

// Backend routes
const adminLoginBackendRoute = "admin/login";
const adminLogoutBackendRoute = "admin/logout";
const adminDashboardBackendRoute = "/todos/admin";
const assignTaskBackendRoute = "/todos/assign-task";
const allUserProfileBackendRoute = "users/all-users";
const userLoginBackendRoute = "/users/login";
const userRegisterBackendRoute = "/users/register";
const userLogoutBackendRoute = "/users/logout";
const userDashboardBackendRoute = "/todos";
const userAddTodoBackendRoute = "/todos";
const userFetchUserProfileBackendRoute = "users/user-profile";

// Frontend routes
export const adminLoginFrontendRoute = "/admin-login";
export const adminDashboardFrontendRoute = "/admin-dashboard";
export const userAssignTaskFrontendRoute = "/task-assign";
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
    `${adminDashboardBackendRoute}?page=${page}&limit=5`,
    token
  );
  return response;
};

export const adminFetchAllUser = async (token) => {
  try {
    const response = await apiRequestBackend(
      "GET",
      allUserProfileBackendRoute,
      token
    );

    return response;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const assignTaskToUser = async (data, token) => {
  try {
    const response = await apiRequestBackend(
      "POST",
      assignTaskBackendRoute,
      data,
      token
    );
    console.log("Task assign response: ", response);

    return response;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const addTodoToTodoList = async (data, token) => {
  try {
    const response = await apiRequestBackend(
      "POST",
      userAddTodoBackendRoute,
      token,
      data
    );

    return response;
  } catch (error) {
    console.error("Error adding todo:", error);
    throw error;
  }
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
  return data;
};

export const userLogoutRoute = async (token) => {
  const data = await apiRequestBackend("POST", userLogoutBackendRoute, token);
  return data;
};

export const userFetchTodosRoute = async (page, token) => {
  const response = await apiRequestBackend(
    "GET",
    `${userDashboardBackendRoute}?page=${page}&limit=5`,
    token
  );
  console.log("userFetchTodos: ", response);

  return response;
};

export const fetchUserProfile = async (token) => {
  const response = await apiRequestBackend(
    "GET",
    userFetchUserProfileBackendRoute,
    token
  );
  return response;
};
