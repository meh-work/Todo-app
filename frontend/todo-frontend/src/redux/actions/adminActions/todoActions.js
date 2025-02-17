import { adminFetchTodosRoute } from "../../../routes/routes";

export const fetchTodos = (page, token) => async (dispatch) => {
  try {
    if (!token) {
      return;
    }
    const response = await adminFetchTodosRoute(page, token);
    console.log("Todos fetched: ", response);
    dispatch(todoReducer(response));
  } catch (error) {
    dispatch({ type: "FETCH_TODOS_FAILURE", error });
  }
};

export const todoReducer = (data) => {
  return {
    type: "FETCH_TODOS_SUCCESS",
    payload: data,
  };
};
