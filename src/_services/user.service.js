import {firstSourceUrl,secondSourceUrl,websocketSource,getLocationDetails} from '../Connectionsettings';
// import config from 'config';
import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    // register,
    // getAll,
    // getById,
    // update,
    // delete: _delete,

    getNextTransactionID
};


function login(username, password, currentlocation) {
    
    var auth = getLocationDetails(currentlocation).certificate; 
    
    var dat = {
        msgType:"StaffLogin",
        msgFmtVer:1,
        sloginUserName:username,
        sloginPWHash:password
        }
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Accept': 'application/json','Content-Type': 'application/json','Authorization': auth },
        body: JSON.stringify(dat)
    };
    return fetch(`${secondSourceUrl}Merchant/Login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}


//nigel added
function getNextTransactionID() {
    
    var dat = {
            "msgType":"TxnTypesReq",
            "msgFmtVer":1,
            "txnTypeId":1,
            "termId":0
        }

    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(dat),
        headers: { 'Authorization':authHeader().Authorization , 'Accept': 'application/json','Content-Type': 'application/json'}
    };

    return fetch(`${secondSourceUrl}Ordering/GetNextTxnNo`, requestOptions).then(handleResponse);
}









//--------------------------------------------------

function handleResponse(response) {
    
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                // location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}