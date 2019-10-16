import { heatmapConstants } from '../_constants';

const initialState = { 
  "testmessage":"bob",
    "evezyData":[]
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
        maxRange:processMinMaxvals(action.data)
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

  let minmax= data.map(val=>{
    if(val.transactionType==="failed"){
      return -val.amount
    }
    return val.amount
  })

  let out = {
              "min": Math.min(...minmax),
              "max": Math.max(...minmax)
            }  
  return out
}