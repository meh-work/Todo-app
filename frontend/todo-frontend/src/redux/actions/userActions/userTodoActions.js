import { userFetchTodosRoute } from "../../../routes/routes";

export const userFetchTodos = (token) => async (dispatch) => {    
  try {
    // const response = await axios.get(userFetchTodosRoute, {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // });
    const response = await userFetchTodosRoute(token)
    console.log("User todo respo: ",response)
    dispatch(userTodoReducer(response));
  } catch (error) {
    dispatch({ type: "FETCH_USER_TODOS_FAILURE" });
    console.log(error)
  }
};

export const userTodoReducer= (data) =>{
  console.log("Todo user reducer data: ",data);
  
 return {
    type: "FETCH_USER_TODOS_SUCCESS",
    payload: data
  }
}
