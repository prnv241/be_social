import * as ActionTypes from "../types";

const initialState = {
  authenticated: false,
  credentials: {},
  likes: [],
  loading: false,
  notifications: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case ActionTypes.SET_UNAUTHENTICATED:
      return initialState;
    case ActionTypes.SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload,
      };
    case ActionTypes.LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.LIKE_SCREAM:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.handle,
            screamId: action.payload.screamId,
          },
        ],
      };
    case ActionTypes.UNLIKE_SCREAM:
      return {
        ...state,
        likes: state.likes.filter(
          (like) => like.screamId !== action.payload.screamId
        ),
      };
    case ActionTypes.MARK_NOTIFICATIONS_READ:
      state.notifications.forEach((not) => {
        not.read = true;
      });
      return {
        ...state,
      };
    default:
      return state;
  }
}
