import { userDashboardFrontendRoute, userLoginFrontendRoute, userLoginRoute } from "../../../routes/routes";

export const login = (formData, navigate) => async (dispatch) => {
  try {
    const { username, password } = formData;
    const userLoginData = {username, password}
    const {data} = await userLoginRoute(userLoginData);
    const { user } = data;
    
    const userLoginToken = user.token
    
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: data });
    localStorage.setItem("token", userLoginToken);
    alert("Login Successful!");
    navigate(userDashboardFrontendRoute);
  } catch (error) {
    alert(error.message || "Login Failed");
    dispatch({ type: "USER_LOGIN_FAILURE" });
  }
};

export const logout = (navigate) => () => {
  localStorage.removeItem("token");
  navigate(userLoginFrontendRoute);
};
