import { applyMiddleware, combineReducers, createStore } from "redux";

const rootReducer = combineReducers({});

const store = createStore(rootReducer, applyMiddleware());

export default store;
