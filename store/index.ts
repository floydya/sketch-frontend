import { createStore, combineReducers, applyMiddleware, compose, AnyAction } from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";
import * as reducers from "./reducers";
import { IUserState } from "./types/user";

export interface IStore {
  user: IUserState
}

const rootReducer = combineReducers({...reducers});
const middlewares = [thunk];
const composeEnhancers = typeof window != 'undefined' && window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);


export const thunkDispatch = (callable: any) => (store.dispatch as ThunkDispatch<IStore, void, AnyAction>)(callable)

export default store;
