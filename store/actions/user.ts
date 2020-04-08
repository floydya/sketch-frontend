import {
  UserActionsEnum,
  SetLoadingAction,
  SetUserAction,
  SetTokenAction,
  RemoveTokenAction,
  IUserState,
  UserReducerAction,
} from "../types/user";
import { axios } from "~/core";
import { ThunkAction } from "redux-thunk";
import { thunkDispatch } from "..";

type ThunkResult<R> = ThunkAction<R, IUserState, undefined, UserReducerAction>;

const userActions = {
  setToken: (token: string): SetTokenAction => ({
    type: UserActionsEnum.setToken,
    token,
  }),
  removeToken: (): RemoveTokenAction => ({
    type: UserActionsEnum.removeToken,
  }),
  setUser: (user: object): SetUserAction => ({
    type: UserActionsEnum.setUser,
    user,
  }),
  setLoading: (status: boolean): SetLoadingAction => ({
    type: UserActionsEnum.setLoading,
    status,
  }),
  fetchUser: (): ThunkResult<void> => (dispatch) => {
    dispatch(userActions.setLoading(true));
    axios.get("/me").then(
      (response) => dispatch(userActions.setUser(response.data)),
      () => {
        dispatch(userActions.removeToken())
      }
    );
  },
  loginUser: (data): ThunkResult<object> => (dispatch) => {
    return axios.post(`/auth/obtain`, data).then(
      (response) => {
        dispatch(userActions.setToken(response.data.token));
        thunkDispatch(userActions.fetchUser());
      },
      (err) => err.response,
    )
  }
};

export default userActions;
