import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import {
  authenticationReducer as authentication,
  createActions,
} from "@floydya/authentication";
import { IState as AuthenticationState } from "@floydya/authentication/store/types";
export interface IStore {
  authentication: AuthenticationState;
}

const rootReducer = combineReducers({ authentication });
const middlewares = [thunk];
const composeEnhancers =
  (typeof window !== "undefined" &&
    (window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] as typeof compose)) ||
  compose;
const makeStore = (initialState, options) => {
  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );
};


export const authenticationActions = createActions({
  loginURL: "http://api.exchange.com/api/v1/auth/jwt/create/",
  refreshURL: "http://api.exchange.com/api/v1/auth/jwt/refresh/",
  verifyURL: "http://api.exchange.com/api/v1/auth/jwt/verify/",
  fetchUserURL: "http://api.exchange.com/api/v1/auth/users/me/",
});

export default makeStore;
