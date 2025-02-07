import { apiRequestBackend } from "../../services/api";
import { adminDashboardBackend } from "../../routes/routes";

export const fetchTodos = (page, token) => async (dispatch) => {
  try {
    const response = await apiRequestBackend("GET", `${adminDashboardBackend}?page=${page}&limit=10`, token);
    dispatch(todoReducer(response))
  } catch (error) {
    dispatch({ type: "FETCH_TODOS_FAILURE" });
    console.log(error)
  }
};

export const todoReducer= (data) =>{
 return {
    type: "FETCH_TODOS_SUCCESS",
    payload: data
  }
}
