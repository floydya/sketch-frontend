import { IUserState, UserActionsEnum, UserReducerAction } from '../types/user'
import { Cookies } from 'react-cookie'

const cookies = new Cookies()

export const initialState: IUserState = {
  token: cookies.get('token') || null,
  user: null,
  isLoading: false,
}

function userReducer(
  state: IUserState = initialState,
  action: UserReducerAction
) {
  switch (action.type) {
    case UserActionsEnum.setToken:
      cookies.set('token', action.token)
      return Object.assign({}, state, { token: action.token })
    case UserActionsEnum.removeToken:
      cookies.remove('token')
      return Object.assign({}, state, {
        token: null,
        user: null,
        isLoading: false,
      })
    case UserActionsEnum.setUser:
      return Object.assign({}, state, { user: action.user, isLoading: false })
    case UserActionsEnum.setLoading:
      return Object.assign({}, state, { isLoading: action.status })
    default:
      return state
  }
}

export default userReducer
