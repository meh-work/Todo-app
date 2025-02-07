import { apiRequestBackend } from "../../../services/api.js";
import { adminDashboardFrontendRoute, adminLoginBackendRoute, adminLoginFrontendRoute, adminLoginRoute } from "../../../routes/routes.js";

export const login = (formData , navigate) => async (dispatch) => {
  try {
    // const endpoint = adminLoginBackendRoute; // Direct API call, avoid using routes.js constants for API calls
    // const data = await apiRequestBackend("POST", endpoint, formData);

    const data = await adminLoginRoute(formData);
    dispatch({ type: "LOGIN_SUCCESS", payload: data.token });
    localStorage.setItem("token", data.token);
    alert("Login Successful!");
    navigate(adminDashboardFrontendRoute)
  } catch (error) {
    alert(error.response?.data?.message || "Login Failed");
    dispatch({ type: "LOGIN_FAILURE" });
  }
};

export const logout = (navigate) => () => {
  localStorage.removeItem("token");
  navigate(adminLoginFrontendRoute)
};
