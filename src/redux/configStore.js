import { applyMiddleware, combineReducers, createStore } from "redux";
import CarouselReducer from "./reducers/CarouselReducer";
import reduxThunk from "redux-thunk";
import MovieManagementReducer from "./reducers/MovieManagementReducer";
import CinemaManagementReducer from "./reducers/CinemaManagementReducer";
import UserManagementReducer from "./reducers/UserManagementReducer";
import QuanLyDatVeReducer from "./reducers/QuanLyDatVeReducer";
import LoadingReducer from "./reducers/LoadingReducer";
const rootReducer = combineReducers({
  CarouselReducer,
  MovieManagementReducer,
  CinemaManagementReducer,
  UserManagementReducer,
  QuanLyDatVeReducer,
  LoadingReducer,
});

const store = createStore(rootReducer, applyMiddleware(reduxThunk));

export default store;
