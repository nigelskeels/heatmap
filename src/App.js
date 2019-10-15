import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import { heatmapActions } from './_actions';
import CalendarHeatmap from 'react-calendar-heatmap';


import './App.css';
import './react-calendar-heatmap.css';

function App(props) {

  useEffect(()=>{
    props.initHeatmap();
  })

  // values={[
  //   { date: '2018-01-01' },
  //   { date: '2018-01-22' },
  //   { date: '2018-01-30' },
  //   // ...and so on
  // ]}

  return (
    <div className="App">
      
      
       <div className="heatmap">
        <CalendarHeatmap
            startDate={new Date('2019-01-01')}
            endDate={new Date('2020-01-01')}
            values={props.evezyData}
            showWeekdayLabels={true}
            showOutOfRangeDays={true}
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
 
  const { testmessage, evezyData } = state.heatmap;
 
  return { testmessage, evezyData };
}

const actionCreators = {
    initHeatmap: heatmapActions.getHeatmapData_action
};

export default connect(mapState, actionCreators)(App)