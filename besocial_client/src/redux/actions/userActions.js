import * as ActionTypes from "../types";
import axios from "axios";

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: ActionTypes.LOADING_UI });

  axios
    .post("/login", {
      email: userData.email,
      password: userData.password,
    })
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: ActionTypes.CLEAR_ERRORS });
      history.push("/");
    })
    .catch((err) => {
      dispatch({
        type: ActionTypes.SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const getUserData = (handle) => (dispatch) => {
  dispatch({ type: ActionTypes.LOADING_USER });
  axios
    .get("/user")
    .then((res) => {
      dispatch({
        type: ActionTypes.SET_USER,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const signupUser = (newuserData, history) => (dispatch) => {
  dispatch({ type: ActionTypes.LOADING_UI });

  axios
    .post("/signup", {
      email: newuserData.email,
      password: newuserData.password,
      confirmPassword: newuserData.confirmPassword,
      handle: newuserData.handle,
    })
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: ActionTypes.CLEAR_ERRORS });
      history.push("/");
    })
    .catch((err) => {
      dispatch({
        type: ActionTypes.SET_ERRORS,
        payload: err.response.data,
      });
    });
};

const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};

export const logOutUser = () => (dispatch) => {
  localStorage.removeItem(`FBIdToken`);
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: ActionTypes.SET_UNAUTHENTICATED });
};

export const uploadImage = (formData) => (dispatch) => {
  dispatch({ type: ActionTypes.LOADING_USER });
  axios
    .post("/user/image", formData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};

export const editUserDetails = (userDetails) => (dispatch) => {
  dispatch({ type: ActionTypes.LOADING_USER });
  axios
    .post("/user", {
      bio: userDetails.bio,
      website: userDetails.website,
      location: userDetails.location,
    })
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};

export const MarkNotificationsRead = (notificationIds) => (dispatch) => {
  axios
    .post(`/notifications`, notificationIds)
    .then((res) => [
      dispatch({
        type: ActionTypes.MARK_NOTIFICATIONS_READ,
      }),
    ])
    .catch((err) => console.log(err));
};
