export interface IUserState {
  token?: string
  user?: {
    id: number
    username: string
    email: string
    avatar: string
  }
  isLoading: boolean
}

export enum UserActionsEnum {
  setLoading = 'USER:SET_LOADING',
  setToken = 'USER:SET_TOKEN',
  removeToken = 'USER:REMOVE_TOKEN',
  setUser = 'USER:SET_USER',
}

export interface SetLoadingAction {
  type: typeof UserActionsEnum.setLoading
  status: boolean
}

export interface SetTokenAction {
  type: typeof UserActionsEnum.setToken
  token: string
}

export interface RemoveTokenAction {
  type: typeof UserActionsEnum.removeToken
}

export interface SetUserAction {
  type: typeof UserActionsEnum.setUser
  user: object
}

export type UserReducerAction =
  | SetTokenAction
  | RemoveTokenAction
  | SetUserAction
  | SetLoadingAction
