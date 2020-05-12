import * as ActionTypes from "../types";

const initialState = {
  loading: false,
  errors: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case ActionTypes.CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: null,
      };
    case ActionTypes.LOADING_UI:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.STOP_LOADING_UI:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
