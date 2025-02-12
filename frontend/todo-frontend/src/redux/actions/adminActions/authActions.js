
import { adminDashboardFrontendRoute, adminLoginFrontendRoute } from "../../../routes/routes.js";
import { loginMiddleWare, logoutMiddleware } from "../../../services/authMiddleware.js";

export const login = (formData , navigate) => async (dispatch) => {
  try {
    const { adminname, password } = formData;
    const loginData = {adminname, password}
    const {data} = await loginMiddleWare(loginData)
    const loginToken = data.token;
    dispatch({ type: "LOGIN_SUCCESS", payload: data });
    localStorage.setItem("token", loginToken);
    alert("Login Successful!");
    navigate(adminDashboardFrontendRoute)
  } catch (error) {
    alert(error.message || "Login Failed");
    dispatch({ type: "LOGIN_FAILURE" });
  }
};

export const logout = (navigate) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token"); 
    if (!token) {
      alert("Already Logged Out!");
      return;
    }
    const response = await logoutMiddleware(token);
    dispatch({type: "LOGOUT", payload: response})
    alert("Logout successful");
    navigate(adminLoginFrontendRoute)
  } catch (error) {
    alert("Logout Failed!");
  }
};
