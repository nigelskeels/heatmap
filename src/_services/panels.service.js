import {firstSourceUrl,secondSourceUrl,websocketSource,getLocationDetails} from '../Connectionsettings';
// import config from 'config';
import { authHeader } from '../_helpers';

import moment from 'moment'
moment.locale('en'); // set to english


export const panelsService = {
    getPanelFilters,
    getPanels,
    createMovementOrder,
    addProdToOrd,
    genSubmitOrd,
    bldgGetOrdSummaryList
};

function getPanelFilters() {
    
    var dat = {
            "msgType":"BldgGetStructReq",
          "msgFmtVer":1,
             "bldgID":"GMS1"
        }

    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(dat),
        headers: { 'Authorization':authHeader().Authorization , 'Accept': 'application/json','Content-Type': 'application/json'}
    };

    return fetch(`${secondSourceUrl}Ordering/BldgGetStruct`, requestOptions).then(handleResponse);
}


function getPanels(selectedfilters) {
    
    var dat = {
        "msgType":"BldgGetPanelsReq",
        "msgFmtVer":1,
        "pnlBldgID":"GMS1",
         "pnlBlock":selectedfilters.bldgBlock,
     "pnlElevation":selectedfilters.bldgElevation,
        "pnlFloors":selectedfilters.bldgFloor,
          "pnlRows":[]
        }

    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(dat),
        headers: { 'Authorization':authHeader().Authorization , 'Accept': 'application/json','Content-Type': 'application/json'}
    };

    return fetch(`${secondSourceUrl}Ordering/BldgGetPanels`, requestOptions).then(handleResponse);
}


function createMovementOrder(filt) {
    
    var nomillisecs = moment.utc().format('YYYY-MM-DD HH:mm:ss');

    var dat = {
            "msgType":"BldgCreatePOSMoveOrderReq",
            "msgFmtVer":1,
             "pmRequestID":"Req "+nomillisecs,
             "pmOperatorID":"Default Op", 
             "pmSuppCode":60, 
             "pmGoodsIn":false,
             "pmStatus":"PICKLIST",
             "pmDelivDateTime":"2019-10-03",
             "pmOurRef": "Building: GMS1 / Block: "+filt.selectedfilters.bldgBlock+" / Elevation: "+filt.selectedfilters.bldgElevation+" / Floor(s): "+filt.selectedfilters.bldgFloor.toString()+" / Cradle: "+filt.selectedDestinationfilters.cradle,
        }

    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(dat),
        headers: { 'Authorization':authHeader().Authorization , 'Accept': 'application/json','Content-Type': 'application/json'}
    };

    return fetch(`${secondSourceUrl}Ordering/BldgCreatePOSMoveOrder`, requestOptions).then(handleResponse);
}


function addProdToOrd(currentPmOrdNo,arrayProds){
   

    let prodsinarray = arrayProds.map( obj => {
        let newobj = {"apoPrCode":obj.pnlPrCode,"apoQty": 1 }
        return newobj
    })

    var dat = {
        "msgType": "AddProdsToOrdReq",
        "msgFmtVer": 1,
        "apoOrdNo": currentPmOrdNo,
        "apoFirstTreeIn": "/",
        "apoProdsIn": prodsinarray
      }

    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(dat),
        headers: { 'Authorization':authHeader().Authorization , 'Accept': 'application/json','Content-Type': 'application/json'}
    };

    return fetch(`${secondSourceUrl}Ordering/AddProdsToOrd`, requestOptions).then(handleResponse);   
}


// NEEDS ADDING
// function removeProdFromOrd(){


// }

function genSubmitOrd(ordernum){
   
    var dateTime = moment.utc().format('YYYY-MM-DD HH:mm:ss');

    var dat = {
        "msgType": "GenSubmitOrdRsp",
        "msgFmtVer": 1,
        "Application": 1,
        "TermType":0,
        "OrderNo":ordernum,
        "OrderType":7,
        "RequestId":"Req: "+dateTime,
        "ReqDateTime":dateTime,
        "TotalAmt":0,
        "Discount":0

      }

    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(dat),
        headers: { 'Authorization':authHeader().Authorization , 'Accept': 'application/json','Content-Type': 'application/json'}
    };

    return fetch(`${secondSourceUrl}Ordering/GenSubmitOrder`, requestOptions).then(handleResponse);   
}



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
        headers: { 'Authorization':authHeader().Authorization , 'Accept': 'application/json','Content-Type': 'application/json'}
    };

    return fetch(`${secondSourceUrl}Ordering/BldgGetOrdSummaryList`, requestOptions).then(handleResponse); 
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