const initialState = {
  todos: [],
  totalResults: 0,
  users: [],
};

export const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_TODOS_SUCCESS":
      return {
        ...state,
        todos: action.payload.todos,
        totalResults: action.payload.total,
      };
    case "FETCH_TODOS_FAILURE":
      return { ...state, todos: [], totalResults: 0 };
    case "FETCH_USERS_SUCCESS":
      return { ...state, users: action.payload };
    case "FETCH_USERS_FAILURE":
      return { ...state, users: [] };
    default:
      return state;
  }
};
