import { heatmapConstants } from '../_constants';
import { heatmapService } from '../_services';


export const heatmapActions = {
    
    getHeatmapData_action,
};




function getHeatmapData_action(){
    return dispatch => {
        dispatch(request());

        heatmapService.readfile()
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: heatmapConstants.GETHEATMAPDATA_REQUEST } }
    function success(data) {return { type: heatmapConstants.GETHEATMAPDATA_SUCCESS, data } }
    function failure(error) { return { type: heatmapConstants.GETHEATMAPDATA_FAILURE, error } }
}