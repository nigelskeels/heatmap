import { heatmapConstants } from '../_constants';

const initialState = { 
  "testmessage":"bob"
};

export function heatmap(state = initialState, action) {

  switch (action.type) {
    case heatmapConstants.GETPANELFILTERS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case heatmapConstants.GETPANELFILTERS_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case heatmapConstants.GETPANELFILTERS_FAILURE:
      return { 
        ...state,
        loading: false,
        error: action.error
      };
    


    default:
      return state
  }
}


