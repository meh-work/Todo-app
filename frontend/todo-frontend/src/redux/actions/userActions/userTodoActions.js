import { userFetchTodosRoute } from "../../../routes/routes";

export const userFetchTodos = (token) => async (dispatch) => {    
  try {
    // const response = await axios.get(userFetchTodosRoute, {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // });
    const response = await userFetchTodosRoute(token)
    dispatch(userTodoReducer(response));
  } catch (error) {
    dispatch({ type: "FETCH_USER_TODOS_FAILURE" });
  }
};

export const userTodoReducer= (data) =>{
  
 return {
    type: "FETCH_USER_TODOS_SUCCESS",
    payload: data
  }
}
