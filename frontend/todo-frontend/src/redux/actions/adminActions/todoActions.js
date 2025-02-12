import { adminFetchTodosRoute } from "../../../routes/routes";

export const fetchTodos = (page, token) => async (dispatch) => {
  try {
    const response = await adminFetchTodosRoute(page,token) 
    dispatch(todoReducer(response))
  } catch (error) {
    dispatch({ type: "FETCH_TODOS_FAILURE" });
  }
};

export const todoReducer= (data) =>{
  
 return {
    type: "FETCH_TODOS_SUCCESS",
    payload: data
  }
}
