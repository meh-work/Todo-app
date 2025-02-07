const initialState = {
    userTodos: [],
  };
  
  export const todoReducer = (state = initialState, action) => {
    switch (action.type) {
      case "FETCH_USER_TODOS_SUCCESS":
        return { ...state, userTodos: action.payload.todos };
      case "FETCH_USER_TODOS_FAILURE":
        return { ...state, userTodos: [] };
      default:
        return state;
    }
  };
  