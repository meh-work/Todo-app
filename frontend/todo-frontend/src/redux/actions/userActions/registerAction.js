import { userLoginFrontendRoute, userRegisterRoute } from "../../../routes/routes";

export const register = (formData, navigate) => async (dispatch) => {
    
    try {
        const data = userRegisterRoute(formData)
        dispatch({ type: "REGISTER_SUCCESS"});
        alert(data.message || "Registration Successful!");
        navigate(userLoginFrontendRoute);
    } catch (error) {
        console.log("Error: ",error)
        alert(error.response?.data?.message || error.message || "Registration Failed");
    }
}