import {
  addTodoToTodoList,
  adminDashboardFrontendRoute,
  adminFetchAllUser,
  adminFetchTodosRoute,
  assignTaskToUser,
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
  console.log("TodoReducer Data: ", data);

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

export const addTodo = (formData, token) => async (dispatch) => {
  try {
    if (!token) {
      return;
    }
    const response = await addTodoToTodoList(formData);

    dispatch({
      type: "ADD_TODO_SUCCESS",
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: "ADD_TODO_FAILURE",
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

export const assignTask =
  (userId, task, token, navigate) => async (dispatch) => {
    try {
      if (!token) {
        return;
      }
      const data = { userId, task };
      const response = await assignTaskToUser(data, token);

      dispatch({
        type: "ASSIGN_TASK_SUCCESS",
        payload: response,
      });
      navigate(adminDashboardFrontendRoute);
    } catch (error) {
      dispatch({
        type: "ASSIGN_TASK_FAILURE",
        payload: error.response ? error.response.data.message : error.message,
      });
    }
  };
