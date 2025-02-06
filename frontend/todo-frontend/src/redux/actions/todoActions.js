import axios from "axios";

export const fetchTodos = (page) => async (dispatch, getState) => {
  try {
    const { auth } = getState();
    const token = auth.token;

    if (!token) {
      dispatch({ type: "FETCH_TODOS_FAILURE" });
      return;
    }

    const response = await axios.get(`http://localhost:5000/api/todos/admin?page=${page}&limit=10`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch({
      type: "FETCH_TODOS_SUCCESS",
      payload: { todos: response.data.todos, total: response.data.total },
    });
  } catch (error) {
    dispatch({ type: "FETCH_TODOS_FAILURE" });
  }
};
