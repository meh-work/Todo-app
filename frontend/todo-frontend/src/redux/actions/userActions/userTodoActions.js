import axios from "axios";
import { userFetchTodosRoute } from "../../../routes/routes";

export const userFetchTodos = (token) => async (dispatch) => {
    console.log("user login Token: ",token);
    
  try {
    const response = await axios.get(userFetchTodosRoute, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: "FETCH_USER_TODOS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "FETCH_USER_TODOS_FAILURE" });
    console.log(error)
  }
};

export const userTodoReducer= (data) =>{
 return {
    type: "FETCH_USER_TODOS_SUCCESS",
    payload: data
  }
}
