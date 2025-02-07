import { apiRequestBackend } from "../../api.js";
import { adminDashboardFrontend, adminLoginBackend, adminLoginFrontend } from "../../routes.js";

export const login = (formData , navigate) => async (dispatch) => {
  try {
    const endpoint = adminLoginBackend; // Direct API call, avoid using routes.js constants for API calls
    const data = await apiRequestBackend("POST", endpoint, formData);

    dispatch({ type: "LOGIN_SUCCESS", payload: data.token });
    localStorage.setItem("token", data.token);
    alert("Login Successful!");
    navigate(adminDashboardFrontend)
  } catch (error) {
    alert(error.response?.data?.message || "Login Failed");
    dispatch({ type: "LOGIN_FAILURE" });
  }
};

export const logout = (navigate) => (dispatch) => {
  localStorage.removeItem("token");
  navigate(adminLoginFrontend)
};
