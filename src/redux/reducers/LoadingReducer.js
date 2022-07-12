import { HIDE_LOADING, SHOW_LOADING } from "../types/LoadingTypes";

const stateDefault = {
  isLoading: false,
};

const LoadingReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case SHOW_LOADING: {
      return { ...state, isLoading: true };
    }
    case HIDE_LOADING: {
      return { ...state, isLoading: false };
    }
    default:
      return { ...state };
  }
};

export default LoadingReducer;
