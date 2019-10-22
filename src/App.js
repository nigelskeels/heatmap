import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import { heatmapActions } from './_actions';
import CalendarHeatmap from 'react-calendar-heatmap';
import './App.css';
import './react-calendar-heatmap.css';

import moment from 'moment'
moment.locale('en'); // set to english


function App(props) {

  useEffect(()=>{
    props.initHeatmap();
  },[])
  
 
  let greenvalmultiplier = 255/Math.round(props.totalRange.successMax)
  let redvalmultiplier = 255/Math.round(props.totalRange.failedMax)
  
  const customTooltipDataAttrs = { 'data-toggle': 'tooltip' };
  function customTitleForValue(value) {
    if(value!==null){
      let datefomat = moment.utc(value.date).format('DD-MM-YYYY');
      return value ? `${datefomat} Transaction ${value.transactionType} with value £${value.amount}` : null;
    }
  }
  
  return (
    <div className="App">    
       <h1>Heatmap</h1>
       <div className="heatmap">
        <CalendarHeatmap
            startDate={new Date('2019-01-01')}
            endDate={new Date('2020-01-01')}
            values={props.evezyData}
            dat={props.evezyData}
            showWeekdayLabels={true}
            weekdayLabels={["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]}
            showOutOfRangeDays={true}

            titleForValue={customTitleForValue}
            tooltipDataAttrs={customTooltipDataAttrs}
            transformDayElement={(element, value, index) =>{
             
             if(value!==null){

                let amountRounded = Math.round(value.amount) 
                
                if(value.transactionType=="success"){
                  let valTo255  = Math.round(amountRounded*greenvalmultiplier)
                  return React.cloneElement(element, { fill: 'rgb(0,'+valTo255+',0)' })                  
                }
                else if(value.transactionType=="failed"){    
                  let valTo255  = Math.round(amountRounded*redvalmultiplier)
                  return React.cloneElement(element, { fill: 'rgb('+valTo255+',0,0)' })
                } 
                else{    
                  return React.cloneElement(element, { fill: 'rgb(192,192,192)' })
                } 
              } 
            }}
            
            
          />
        </div>
    </div>
  );
}


function mapState(state) {

  console.log(state)
 
  const { evezyData, totalRange } = state.heatmap;
 
  return { evezyData, totalRange };
}

const actionCreators = {
    initHeatmap: heatmapActions.getHeatmapData_action
};

export default connect(mapState, actionCreators)(App)