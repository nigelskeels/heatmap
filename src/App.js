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

  let redvalmultiplier = 255/props.minRange
  let greenvalmultiplier = 255/props.maxRange
  
  return (
    <div className="App">    
       <div className="heatmap">
        <CalendarHeatmap
            startDate={new Date('2019-01-01')}
            endDate={new Date('2020-01-01')}
            values={props.evezyData}
            showWeekdayLabels={true}
            showOutOfRangeDays={true}
            
            transformDayElement={ (element, value, index) =>
              
              //  let val = props.evezyData[index]
              // React.cloneElement(element, { fill: 'rgb(${value.amount*greenvalmultiplier}, 0, 0)' })
               React.cloneElement(element, { fill: 'rgb(0,255,0)' })
            
            
            }
            
            classForValue={(value) => {
               
              if (!value) {
                return 'color-empty';
              }

              return `color-scale-${value.amount}`;
            }}
          />
        </div>
    </div>
  );
}


function mapState(state) {

  console.log(state)
 
  const { testmessage, evezyData, maxRange } = state.heatmap;
 
  return { testmessage, evezyData, maxRange };
}

const actionCreators = {
    initHeatmap: heatmapActions.getHeatmapData_action
};

export default connect(mapState, actionCreators)(App)