import { apiRequestBackend } from "../../../services/api";
import { userDashboardFrontend, userLoginBackend, userLoginFrontend } from "../../../routes/routes";

export const login = (formData, navigate) => async (dispatch) => {
  try {
    const endpoint = userLoginBackend
    const data = await apiRequestBackend("POST", endpoint, formData)

    dispatch({ type: "LOGIN_SUCCESS", payload: data.token });
    localStorage.setItem("token", data.token);
    alert("Login Successful!");
    navigate(userDashboardFrontend);
  } catch (error) {
    alert(error.response?.data?.message || "Login Failed");
    dispatch({ type: "LOGIN_FAILURE" });
  }
};

export const logout = (navigate) => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: "LOGOUT" });
  navigate(userLoginFrontend);
};
