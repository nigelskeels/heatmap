import { panelsConstants } from '../_constants';
import { panelsService } from '../_services';
// import { alertActions } from './';
// import { history } from '../_helpers';

import {store} from '../_helpers/store';

export const panelActions = {
    getPanels_action,
    getPanelFilters_action,
    setPanelFilters_action,
    selectPanel_action,
    selectAllPanels_action,
    setLocationFilters_action,
    createMovementOrder_action,
    addProdToOrd_action,
    genSubmitOrd_action,
    updatesearchinput_action,
    bldgGetOrdSummaryList_action,
    selectOrder_action
};



function getPanelFilters_action(){
    return dispatch => {
        dispatch(request());

        panelsService.getPanelFilters()
            .then(
                data => {
                    dispatch(success(data))
                    dispatch(bldgGetOrdSummaryList_action())                   
                },
                error => dispatch(failure(error.toString()))
            )
    };

    function request() { return { type: panelsConstants.GETPANELFILTERS_REQUEST } }
    function success(data) { return { type: panelsConstants.GETPANELFILTERS_SUCCESS, data } }
    function failure(error) { return { type: panelsConstants.GETPANELFILTERS_FAILURE, error } }

}


function setPanelFilters_action(selectedfilters){
    return dispatch => {
        dispatch({ type: panelsConstants.SETPANELFILTERS, selectedfilters })
        dispatch( getPanels_action() )
    }
}


function setLocationFilters_action(selectedDestinationfilters){
    return dispatch => {
        dispatch({ type: panelsConstants.SETLOCATIONFILTERS, selectedDestinationfilters })
    }
}



function getPanels_action(){

    let filt = store.getState().panels.selectedfilters

    return dispatch => {
        dispatch(request());

        panelsService.getPanels(filt)
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: panelsConstants.GETPANELS_REQUEST } }
    function success(data) { return { type: panelsConstants.GETPANELS_SUCCESS, data } }
    function failure(error) { return { type: panelsConstants.GETPANELS_FAILURE, error } }

}


function selectPanel_action(panel){
    return dispatch => {
        dispatch({ type: panelsConstants.SELECTPANEL, panel })
    }
}


function selectAllPanels_action(){
    return dispatch => {
        dispatch({ type: panelsConstants.SELECTALLPANELS })
    }
}




function createMovementOrder_action(){

    let filt = store.getState().panels

    return dispatch => {
        dispatch( request() )

        panelsService.createMovementOrder(filt)
            .then(
                data => {
                    dispatch(success(data))
                    dispatch(addProdToOrd_action())                   
                },
                error => dispatch(failure(error.toString()))
            )
    };

    function request() { return { type: panelsConstants.CREATEMOVEMENTORDER_REQUEST } }
    function success(data) { return { type: panelsConstants.CREATEMOVEMENTORDER_SUCCESS, data } }
    function failure(error) { return { type: panelsConstants.CREATEMOVEMENTORDER_FAILURE, error } }
}



function addProdToOrd_action(){
   
    let filt = store.getState().panels;

    return dispatch => {
        dispatch( request() )

        panelsService.addProdToOrd(filt.currentPmOrdNo,filt.selcheckedlist)
            .then(
                data => {
                    dispatch(success(data)) 
                    dispatch(genSubmitOrd_action(data))                   

                },
                error => dispatch(failure(error.toString()))
            )
    };

    function request() { return { type: panelsConstants.ADDPRODTORDER_REQUEST } }
    function success(data) { return { type: panelsConstants.ADDPRODTORDER_SUCCESS, data } }
    function failure(error) { return { type: panelsConstants.ADDPRODTORDER_FAILURE, error } }
}


function genSubmitOrd_action(){
    let ordNo = store.getState().panels.currentPmOrdNo;

    return dispatch => {
        dispatch( request() )

        panelsService.genSubmitOrd(ordNo)
            .then(
                data => {
                    dispatch(success(data))                   
                },
                error => dispatch(failure(error.toString()))
            )
    };

    function request() { return { type: panelsConstants.GENSUBMITORDER_REQUEST } }
    function success(data) { return { type: panelsConstants.GENSUBMITORDER_SUCCESS, data } }
    function failure(error) { return { type: panelsConstants.GENSUBMITORDER_FAILURE, error } }
}


function bldgGetOrdSummaryList_action(){
    
    return dispatch => {
        dispatch( request() )

        panelsService.bldgGetOrdSummaryList()
            .then(
                data => {
                    dispatch(success(data))                   
                },
                error => dispatch(failure(error.toString()))
            )
    };


    function request() { return { type: panelsConstants.BLDGGETORDSUMMARYLIST_REQUEST } }
    function success(data) { return { type: panelsConstants.BLDGGETORDSUMMARYLIST_SUCCESS, data } }
    function failure(error) { return { type: panelsConstants.BLDGGETORDSUMMARYLIST_FAILURE, error } }
}


function selectOrder_action(panel){
    return dispatch => {
        dispatch({ type: panelsConstants.SELECTORDER, panel })
        dispatch(getPanels_action())
        //TO DO next it should get the order detail and select each of the check boxes for items in the order
    }
}


function updatesearchinput_action(inputtext){
    return dispatch => {
        dispatch({ type: panelsConstants.UPDATESEARCHINPUT, inputtext })
    }
}