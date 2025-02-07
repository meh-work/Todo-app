import axios from "axios";

export const login = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await axios.post("http://localhost:5000/api/users/login", formData);
    
    dispatch({ type: "LOGIN_SUCCESS", payload: data.token });
    localStorage.setItem("token", data.token);
    alert("Login Successful!");
    navigate("/dashboard");
  } catch (error) {
    alert(error.response?.data?.message || "Login Failed");
    dispatch({ type: "LOGIN_FAILURE" });
  }
};

export const logout = (navigate) => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: "LOGOUT" });
  navigate("/");
};
