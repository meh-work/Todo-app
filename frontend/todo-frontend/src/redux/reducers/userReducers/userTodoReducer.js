const initialState = {
    userTodos: [],
  };
  
  export const userTodoReducer = (state = initialState, action) => {
    switch (action.type) {
      case "FETCH_USER_TODOS_SUCCESS":
        return { ...state, userTodos: action.payload };
      case "FETCH_USER_TODOS_FAILURE":
        return { ...state, userTodos: [] };
      default:
        return state;
    }
  };
  