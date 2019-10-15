import { userConstants } from '../_constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        showpage: true,
        user: action.user
      };
      case userConstants.LOGIN_SUCCESS:
        return {
          loggedIn: true,
          user: action.user,
          showpage: false
      };
    case userConstants.LOGIN_FAILURE:
      return {
        showpage: true,
      };
    case userConstants.LOGOUT:
      return {
        showpage: true,
      };
    default:
      return state
  }
}