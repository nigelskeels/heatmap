import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    getNextTransactionID_action,
    // register,
    // getAll,
    // delete: _delete
};

function login(username, password, currentLocation) {
    return dispatch => {
        dispatch(request({ username }));
        userService.login(username, password, currentLocation)
            .then(
                user => { 
                    if(user.msgRespSuccess===true){
                        dispatch(success(user));
                        history.push('/');
                    }else{
                        dispatch(failure(user.msgRespStatus.toString()));
                        dispatch(alertActions.error(user.msgRespMsg.toString()));
                    }
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}


function getNextTransactionID_action(){
    return dispatch => {
        dispatch(request());

        userService.getNextTransactionID()
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETTRANSNO_REQUEST } }
    function success(data) { return { type: userConstants.GETTRANSNO_SUCCESS, data } }
    function failure(error) { return { type: userConstants.GETTRANSNO_FAILURE, error } }
}