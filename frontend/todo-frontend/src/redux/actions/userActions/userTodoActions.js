import {
  fetchUserProfile,
  userFetchTodosRoute,
  userViewProfileFrontendRoute,
} from "../../../routes/routes";

export const userFetchTodos = (page, token) => async (dispatch) => {
  try {
    const response = await userFetchTodosRoute(page, token);
    dispatch(userTodoReducer(response));
  } catch (error) {
    dispatch({ type: "FETCH_USER_TODOS_FAILURE" });
  }
};

export const userTodoReducer = (data) => {
  console.log("User todo reducer data: ", data);
  return {
    type: "FETCH_USER_TODOS_SUCCESS",
    payload: data,
  };
};

export const userViewProfile = (token, navigate) => async (dispatch) => {
  try {
    const response = await fetchUserProfile(token);
    dispatch(userViewProfileReducer(response.data));
    navigate(userViewProfileFrontendRoute);
  } catch (error) {
    dispatch({ type: "USER_VIEW_PROFILE_FAILURE" });
  }
};

export const userViewProfileReducer = (data) => {
  return {
    type: "USER_VIEW_PROFILE_SUCCESS",
    payload: data,
  };
};
