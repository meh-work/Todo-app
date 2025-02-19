const initialState = {
  userTodos: [],
  totalUserResults: 0,
};

export const userTodoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USER_TODOS_SUCCESS":
      return {
        ...state,
        userTodos: action.payload,
        totalUserResults: action.payload.total,
      };
    case "FETCH_USER_TODOS_FAILURE":
      return { ...state, userTodos: [] };
    default:
      return state;
  }
};
