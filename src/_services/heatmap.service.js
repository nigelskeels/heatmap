import {firstSourceUrl} from '../Connectionsettings';
// import config from 'config';
// import { authHeader } from '../_helpers';

import moment from 'moment'
moment.locale('en'); // set to english


export const heatmapService = {
    bldgGetOrdSummaryList
};






function bldgGetOrdSummaryList(){
    var dateTime = moment.utc().format('YYYY-MM-DD HH:mm:ss');

    var dat = {
        "msgType": "BldgGetOrdSummaryListReq",
        "msgFmtVer": 1,
        "reqdEmailAddr":"picker@efp-me.com",
        "reqdOrdState":"PICKLIST",
      }

    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(dat),
        headers: { 'Authorization':"test" , 'Accept': 'application/json','Content-Type': 'application/json'}
    };

    return fetch(`${firstSourceUrl}Ordering/BldgGetOrdSummaryList`, requestOptions).then(handleResponse); 
}





//--------------------------------------------------

function handleResponse(response) {
    
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                // logout();
                // location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}