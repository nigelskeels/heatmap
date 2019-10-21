import { heatmapConstants } from '../_constants';

const initialState = { 
    "evezyData":[],
    "totalRange":{'successMax':0,'failedMax':0}
};

export function heatmap(state = initialState, action) {

  switch (action.type) {
    case heatmapConstants.GETHEATMAPDATA_REQUEST:
      return {
        ...state,
        loading: true
      };
    case heatmapConstants.GETHEATMAPDATA_SUCCESS:
      return {
        ...state,
        loading: false,
        evezyData:action.data,
        totalRange:processMinMaxvals(action.data)
      };
    case heatmapConstants.GETHEATMAPDATA_FAILURE:
      return { 
        ...state,
        loading: false,
        error: action.error
      };
    


    default:
      return state
  }
}


const processMinMaxvals = (data) => {


  let sucessArray = []
  let failedArray = []

  for (let i = 0; i < data.length; i++) {
    if(data[i].transactionType==="success"){
      sucessArray.push(data[i].amount)
    }
    if(data[i].transactionType==="failed"){
      failedArray.push(data[i].amount)
    }    
  }
 
  let out = {
              "successMax": Math.round(Math.max(...sucessArray)),
               "failedMax": Math.round(Math.min(...failedArray))
            }  
  return out
}