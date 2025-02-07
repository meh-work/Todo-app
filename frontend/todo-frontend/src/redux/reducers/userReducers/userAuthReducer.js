const initialState = {
    token: localStorage.getItem("token") || null,
  };
  
  export const userAuthReducer = (state = initialState, action) => {
    switch (action.type) {
      case "USER_LOGIN_SUCCESS":
        return { ...state, token: action.payload };
      case "USER_LOGOUT":
        return { ...state, token: null };
      case "USER_LOGIN_FAILURE":
        return { ...state, token: null };
      default:
        return state;
    }
  };
  