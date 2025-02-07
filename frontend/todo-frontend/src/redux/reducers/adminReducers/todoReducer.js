const initialState = {
    todos: [],
    totalResults: 0,
  };
  
  export const todoReducer = (state = initialState, action) => {
    switch (action.type) {
      case "FETCH_TODOS_SUCCESS":
        return { ...state, todos: action.payload.todos, totalResults: action.payload.total };
      case "FETCH_TODOS_FAILURE":
        return { ...state, todos: [], totalResults: 0 };
      default:
        return state;
    }
  };
  