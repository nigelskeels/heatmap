import { userConstants } from '../_constants';

export function transnosy(state = {}, action) {
  switch (action.type) {
    case userConstants.GETTRANSNO_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETTRANSNO_SUCCESS:
      return {
        items: action.data
      };
    case userConstants.GETTRANSNO_FAILURE:
      return { 
        error: action.error
      };
    
    default:
      return state
  }
}