import { userDashboardFrontendRoute, userLoginFrontendRoute, userLoginRoute } from "../../../routes/routes";

export const login = (formData, navigate) => async (dispatch) => {
  try {
    const data = userLoginRoute(formData);
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: data.token });
    localStorage.setItem("token", data.token);
    alert("Login Successful!");
    navigate(userDashboardFrontendRoute);
  } catch (error) {
    alert(error.response?.data?.message || "Login Failed");
    dispatch({ type: "USER_LOGIN_FAILURE" });
  }
};

export const logout = (navigate) => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: "USER_LOGOUT" });
  navigate(userLoginFrontendRoute);
};
