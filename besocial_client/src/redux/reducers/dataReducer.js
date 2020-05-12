import * as ActionTypes from "../types";

const initialState = {
  screams: [],
  scream: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false,
      };
    case ActionTypes.LIKE_SCREAM:
    case ActionTypes.UNLIKE_SCREAM:
      let index = state.screams.findIndex(
        (scream) => scream.screamId === action.payload.screamId
      );
      state.screams[index] = action.payload;
      if (state.scream.screamId === action.payload.screamId) {
        state.scream = action.payload;
      }
      return {
        ...state,
      };
    case ActionTypes.DELETE_SCREAM:
      let index1 = state.screams.findIndex(
        (scream) => scream.screamId === action.payload
      );
      state.screams.splice(index1, 1);
      return {
        ...state,
      };
    case ActionTypes.POST_SCREAM:
      return {
        ...state,
        screams: [action.payload, ...state.screams],
      };
    case ActionTypes.SET_SCREAM:
      return {
        ...state,
        scream: action.payload,
      };
    case ActionTypes.SUBMIT_COMMENT:
      return {
        ...state,
        scream: {
          ...state.scream,
          comments: [action.payload, ...state.scream.comments],
        },
      };
    default:
      return state;
  }
}
