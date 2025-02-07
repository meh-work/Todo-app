import axios from "axios";

export const register = (formData, navigate) => async (dispatch) => {
    
    try {
        const {data} = await axios.post("http://localhost:5000/api/users/register",formData)
        dispatch({ type: "REGISTER_SUCCESS"});
        alert(data.message || "Registration Successful!");
        navigate("/");
    } catch (error) {
        console.log("Error: ",error)
        alert(error.response?.data?.message || error.message || "Registration Failed");
    }
}