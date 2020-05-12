import * as ActionTypes from "../types";
import axios from "axios";

export const getScreams = () => (dispatch) => {
  dispatch({ type: ActionTypes.LOADING_DATA });
  axios
    .get("/screams")
    .then((res) => {
      dispatch({
        type: ActionTypes.SET_SCREAMS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: ActionTypes.SET_SCREAMS,
        payload: [],
      });
    });
};

export const likeScream = (screamId) => (dispatch) => {
  axios
    .get(`/scream/${screamId}/like`)
    .then((res) => {
      dispatch({
        type: ActionTypes.LIKE_SCREAM,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const unlikeScream = (screamId) => (dispatch) => {
  axios
    .get(`/scream/${screamId}/unlike`)
    .then((res) => {
      dispatch({
        type: ActionTypes.UNLIKE_SCREAM,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const deleteScream = (screamId) => (dispatch) => {
  axios
    .delete(`/scream/${screamId}`)
    .then(() => {
      dispatch({ type: ActionTypes.DELETE_SCREAM, payload: screamId });
    })
    .catch((err) => console.log(err));
};

export const postScream = (newScream) => (dispatch) => {
  dispatch({ type: ActionTypes.LOADING_UI });
  axios
    .post("/scream", {
      body: newScream.body,
    })
    .then((res) => {
      dispatch({
        type: ActionTypes.POST_SCREAM,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: ActionTypes.SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: ActionTypes.CLEAR_ERRORS });
};

export const getScream = (screamId) => (dispatch) => {
  dispatch({ type: ActionTypes.LOADING_UI });
  axios
    .get(`/scream/${screamId}`)
    .then((res) => {
      dispatch({
        type: ActionTypes.SET_SCREAM,
        payload: res.data,
      });
      dispatch({ type: ActionTypes.STOP_LOADING_UI });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const submitComment = (screamId, commentData) => (dispatch) => {
  axios
    .post(`/scream/${screamId}/comment`, {
      body: commentData.body,
    })
    .then((res) => {
      dispatch({
        type: ActionTypes.SUBMIT_COMMENT,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: ActionTypes.SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const getUserData = (userHandle) => (dispatch) => {
  dispatch({ type: ActionTypes.LOADING_DATA });
  axios
    .get(`/user/${userHandle}`)
    .then((res) => {
      dispatch({
        type: ActionTypes.SET_SCREAMS,
        payload: res.data.screams,
      });
    })
    .catch(() => {
      dispatch({
        type: ActionTypes.SET_SCREAMS,
        payload: null,
      });
    });
};
