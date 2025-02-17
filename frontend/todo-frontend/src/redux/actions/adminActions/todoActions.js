import {
  adminFetchAllUser,
  adminFetchTodosRoute,
} from "../../../routes/routes";

export const fetchTodos = (page, token) => async (dispatch) => {
  try {
    if (!token) {
      return;
    }
    const response = await adminFetchTodosRoute(page, token);
    dispatch(todoReducer(response));
  } catch (error) {
    dispatch({ type: "FETCH_TODOS_FAILURE" });
  }
};

export const todoReducer = (data) => {
  return {
    type: "FETCH_TODOS_SUCCESS",
    payload: data,
  };
};

export const fetchUsers = (token) => async (dispatch) => {
  try {
    if (!token) {
      return;
    }
    dispatch({ type: "FETCH_USERS_REQUEST" });
    const response = await adminFetchAllUser(token);
    console.log("FetchUSers respo: ", response);

    dispatch({
      type: "FETCH_USERS_SUCCESS",
      payload: response.data.users,
    });
  } catch (error) {
    dispatch({
      type: "FETCH_TODOS_FAILURE",
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};
