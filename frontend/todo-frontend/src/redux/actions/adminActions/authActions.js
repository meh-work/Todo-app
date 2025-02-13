
import { adminDashboardFrontendRoute, adminLoginFrontendRoute } from "../../../routes/routes.js";
import { loginMiddleWare, logoutMiddleware } from "../../../services/authMiddleware.js";

export const login = (formData , navigate) => async (dispatch) => {
  try {
    const { adminname, password } = formData;
    const loginData = {adminname, password}
    const {data} = await loginMiddleWare(loginData)
    const loginToken = data.token;
    if(loginData){
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
      localStorage.setItem("token", loginToken);
      alert("Login Successful!");
      navigate(adminDashboardFrontendRoute)
    } else {
      throw new Error("Invalid token recieved.")
    }
  } catch (error) {
    alert("Invalid Credentials");
    navigate(adminLoginFrontendRoute)
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
    await logoutMiddleware(token);
    localStorage.removeItem("token")
    dispatch({type: "LOGOUT"})
    alert("Logout successful");
    navigate(adminLoginFrontendRoute)
  } catch (error) {
    alert("Logout Failed!");
  }
};
