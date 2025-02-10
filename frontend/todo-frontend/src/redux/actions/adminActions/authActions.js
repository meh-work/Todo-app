
import { adminDashboardFrontendRoute, adminLoginFrontendRoute, adminLoginRoute } from "../../../routes/routes.js";

export const login = (formData , navigate) => async (dispatch) => {
  try {
    const data = await adminLoginRoute(formData);
    dispatch({ type: "LOGIN_SUCCESS", payload: data.token });
    localStorage.setItem("token", data.token);
    alert("Login Successful!");
    console.log(localStorage.getItem("Token fetched: ",data.token))
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
