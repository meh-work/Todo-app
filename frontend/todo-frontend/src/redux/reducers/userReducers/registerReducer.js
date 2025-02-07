export const registerReducer = (state = initialState, action) => {
    switch (action.type) {
      case "REGISTER_SUCCESS":
        return { ...state, token: action.payload };
      default:
        return state;
    }
};