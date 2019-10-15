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
        evezyData:action.data
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


