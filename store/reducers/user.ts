import {
  IUserState,
  UserActionsEnum,
  UserReducerAction,
} from "../types/user";

export const initialState: IUserState = {
  token: null,
  user: null,
  isLoading: false,
};

function userReducer(
  state: IUserState = initialState,
  action: UserReducerAction
) {
  switch (action.type) {
    case UserActionsEnum.setToken:
      localStorage.setItem("token", action.token);
      return Object.assign({}, state, { token: action.token });
    case UserActionsEnum.removeToken:
      localStorage.removeItem("token");
      return Object.assign({}, state, { token: null, user: null, isLoading: false });
    case UserActionsEnum.setUser:
      return Object.assign({}, state, { user: action.user, isLoading: false });
    case UserActionsEnum.setLoading:
      return Object.assign({}, state, { isLoading: action.status });
    default:
      return state;
  }
}

export default userReducer;
