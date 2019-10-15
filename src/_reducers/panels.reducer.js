import { panelsConstants } from '../_constants';

const initialState = { 
  "selectedfilters":{"bldgBlock":null,"bldgElevation":null,"bldgFloor":[] },
  "filterdata":{},
  "items":{"bldgPanels":[]},
  "destinations":{
    "location":{"EFP_Dubai":false,"EFP_UK(Thatcham)":false,"EFP_MACE":false},
    "cradle":{"C1":false,"C2":false,"C3":false,"C4":false} 
  },
  "selectedDestinationfilters":{"location":"","cradle":""},
  "numPanelsSelected":0,
  "currentPmOrdNo":null,
  "selcheckedlist":[],
  "lastPanelSel":"",
  "searchfilter":"",
  "bldordsummarylist":[],
  "currentSelectedOrder":""
};

export function panels(state = initialState, action) {

  switch (action.type) {
    case panelsConstants.GETPANELFILTERS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case panelsConstants.GETPANELFILTERS_SUCCESS:
       let allpannelfilterdata = getBuildingFilterValues(action.data.bldgStruct,state)
      return {
        ...state,
        loading: false,
        allitems: action.data.bldgStruct,
        filterdata: allpannelfilterdata
      };
    case panelsConstants.GETPANELFILTERS_FAILURE:
      return { 
        ...state,
        loading: false,
        error: action.error
      };
    case panelsConstants.GETPANELS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case panelsConstants.GETPANELS_SUCCESS:
      let retCheckSelection = addCheckBoxSelection(action.data)
      return {
        ...state,
        loading: false,
        items: retCheckSelection
      };
    case panelsConstants.GETPANELS_FAILURE:
      return { 
        ...state,
        loading: false,
        error: action.error
      };
    case panelsConstants.SETPANELFILTERS:
        //first bit clears out other filters if the bldgBlock is changed
        let selfilts
        if(action.selectedfilters.bldgBlock!==undefined){
          selfilts={"bldgBlock":action.selectedfilters.bldgBlock,"bldgElevation":null,"bldgFloor":[]}
        }else{
          selfilts = {...state.selectedfilters, ...action.selectedfilters }
        }

        let retpannelfilterdata = getBuildingFilterValues(state.allitems,state,action)
        return {
          ...state,
          selectedfilters:selfilts,
          filterdata: retpannelfilterdata
        };
    case panelsConstants.SELECTPANEL:
        let newitems = {...state.items}
        let counter=0

        let checkedlist = []

        var updateditems = newitems.bldgPanels.map((it)=>{ 
            if(action.panel.pnlID===it.pnlID){
                it=action.panel
            }
            if(it.pnlSelected===true){
              checkedlist.push(it)
              counter++
            }
            return it
        })
        newitems.bldgPanels=updateditems

        return {
          ...state,
          items:newitems,
          numPanelsSelected:counter,
          selcheckedlist:checkedlist,
          lastPanelSel:action.panel
        };

    case panelsConstants.SELECTALLPANELS:
        
        let morenewitems = {...state.items}
        let first = morenewitems.bldgPanels[0].pnlSelected
        
        checkedlist = []
        updateditems = morenewitems.bldgPanels.map((it)=>{
            it.pnlSelected=!first
            if(it.pnlSelected===true){
              checkedlist.push(it)
            }
            return it
        })
        morenewitems.bldgPanels=updateditems

        let numPanels = updateditems.length
        if(first==true){
          numPanels=0
        }

        return {
          ...state,
          items:morenewitems,
          numPanelsSelected:numPanels,
          selcheckedlist:checkedlist
        };

      case panelsConstants.SETLOCATIONFILTERS:
          return { 
            ...state,
            selectedDestinationfilters:{...state.selectedDestinationfilters,...action.selectedDestinationfilters}
          };
      
      case panelsConstants.CREATEMOVEMENTORDER_REQUEST:
        return {
          ...state,
          loading: true
        };
      case panelsConstants.CREATEMOVEMENTORDER_SUCCESS:
        return {
          ...state,
          loading: false,
          currentPmOrdNo:action.data.pmOrdNo
        };
      case panelsConstants.CREATEMOVEMENTORDER_FAILURE:
        return { 
          ...state,
          loading: false,
          error: action.error
        };


      case panelsConstants.ADDPRODTORDER_REQUEST:
          return {
            ...state,
            loading: true
          };
      case panelsConstants.ADDPRODTORDER_SUCCESS:
        return {
          ...state,
          loading: false
        };
      case panelsConstants.ADDPRODTORDER_FAILURE:
        return { 
          ...state,
          loading: false,
          error: action.error
        };

      case panelsConstants.GENSUBMITORDER_REQUEST:
          return {
            ...state,
            loading: true
          };
      case panelsConstants.GENSUBMITORDER_SUCCESS:
        return {
          ...state,
          loading: false
        };
      case panelsConstants.GENSUBMITORDER_FAILURE:
        return { 
          ...state,
          loading: false,
          error: action.error
        };

        case panelsConstants.BLDGGETORDSUMMARYLIST_REQUEST:
          return {
            ...state,
            loading: true
          };
      case panelsConstants.BLDGGETORDSUMMARYLIST_SUCCESS:
        return {
          ...state,
          loading: false,
          bldordsummarylist:action.data.OrdList
        };
      case panelsConstants.BLDGGETORDSUMMARYLIST_FAILURE:
        return { 
          ...state,
          loading: false,
          error: action.error
        };
      
      case panelsConstants.SELECTORDER:
        
        let filtset = extractOrderFilterSetting(action.panel.OrdOurRef)

        return { 
          ...state,
          loading: false,
          currentSelectedOrder:action.panel.OrdNum,
          selectedfilters:{"bldgBlock":filtset.block,"bldgElevation":filtset.elevation,"bldgFloor":[filtset.floor]},
          selectedDestinationfilters:{"location":"","cradle":filtset.cradle},
        };

      case panelsConstants.UPDATESEARCHINPUT:
        return { 
          ...state,
          error: action.error,
          searchfilter:action.inputtext
        };




    default:
      return state
  }
}


const getBuildingFilterValues= (data,state,action) =>{

  let selectdoptions = state;
  if(action!=undefined){
     selectdoptions = {...state.selectedfilters, ...action.selectedfilters}
  }

  //loads all options into an object from an array
  var buildingFilters = {
                          "bldgBlock":{},
                          "bldgElevation":{},
                          "bldgFloor":{}
                        } 
                  
  for (let i = 0; i < data.length; i++) {
      if(data[i].bldgBlock){
          buildingFilters.bldgBlock[data[i].bldgBlock]=false;
      }
      if(data[i].bldgBlock===selectdoptions.bldgBlock){
        if(data[i].bldgElevation){
          buildingFilters.bldgElevation[data[i].bldgElevation]=false;
        }
      }
      if(data[i].bldgElevation===selectdoptions.bldgElevation){
        if(data[i].bldgFloor){
          buildingFilters.bldgFloor[data[i].bldgFloor]=false;
        }
      }
  }
  return buildingFilters
}






const addCheckBoxSelection = (data)=> {
 if(data.bldgPanels!==null){
   for (let i = 0; i < data.bldgPanels.length; i++) {
    data.bldgPanels[i]["pnlSelected"]=false
    data.bldgPanels[i]["cradle"]="C1"
   }
 }
 return data
}


const extractOrderFilterSetting = (settings)=> {
  let array = settings.split("/");
  
  let obj = {}
  let newobj = array.map(val => {
    if(val.includes("Building:")){
      obj["building"]=val.replace("Building: ","").trim()
    }
    if(val.includes("Block:")){
      obj["block"]=val.replace("Block: ","").trim()
    }
    if(val.includes("Elevation:")){
      obj["elevation"]=val.replace("Elevation: ","").trim()
    }
    if(val.includes("Floor:")){
      obj["floor"]=val.replace("Floor: ","").trim()
    }
    if(val.includes("Cradle:")){
      obj["cradle"]=val.replace("Cradle: ","").trim()
    }
    return 
  })
  return obj
}