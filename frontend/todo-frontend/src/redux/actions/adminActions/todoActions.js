import { adminFetchTodosRoute } from "../../../routes/routes";

export const fetchTodos = (page, token) => async (dispatch) => {
  try {
    const response = await adminFetchTodosRoute(page,token)
    console.log("Admin resp: ",response);   
    dispatch(todoReducer(response))
  } catch (error) {
    dispatch({ type: "FETCH_TODOS_FAILURE" });
    console.log(error)
  }
};

export const todoReducer= (data) =>{
  console.log("Todo reducer data: ",data);
  
 return {
    type: "FETCH_TODOS_SUCCESS",
    payload: data
  }
}
