import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import { heatmapActions } from './_actions';
import CalendarHeatmap from 'react-calendar-heatmap';


import './App.css';
import './react-calendar-heatmap.css';

function App(props) {

  useEffect(()=>{
    props.initHeatmap();
  },[])
  
  let greenvalmultiplier = 255/props.totalRange.successMax
  let redvalmultiplier = 255/props.totalRange.failedMax
  
  return (
    <div className="App">    
       <div className="heatmap">
        <CalendarHeatmap
            startDate={new Date('2019-01-01')}
            endDate={new Date('2020-01-01')}
            values={props.evezyData}
            dat={props.evezyData}
            showWeekdayLabels={true}
            showOutOfRangeDays={true}
            // onClick={value => alert(`${value.transactionType} Transaction of ${value.amount}`)}
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