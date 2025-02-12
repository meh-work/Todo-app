import { login as adminLogin } from "../redux/actions/adminActions/authActions";
import { login as userLogin } from "../redux/actions/userActions/userAuthActions";

export const tokenValidator = (token, dispatch, navigate, failureType, callback, isAdmin = false) => {
    if (!token) {
        dispatch({ type: failureType });
        dispatch(isAdmin ? adminLogin(navigate) : userLogin(navigate));
        return;
    }
    callback(); // Execute the API call if the token is valid
};
