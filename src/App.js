import React from 'react';
import { connect } from 'react-redux';
import { heatmapActions } from './_actions';
import CalendarHeatmap from 'react-calendar-heatmap';


import './App.css';
import './react-calendar-heatmap.css';

function App(props) {
  return (
    <div className="App">
      
       This is a test yes {props.testmessage}
       <div className="heatmap">
        <CalendarHeatmap
            startDate={new Date('2016-01-01')}
            endDate={new Date('2016-04-01')}
            values={[
              { date: '2016-01-01' },
              { date: '2016-01-22' },
              { date: '2016-01-30' },
              // ...and so on
            ]}
          />
        </div>
    </div>
  );
}


function mapState(state) {

  console.log(state)
 
  const { testmessage } = state.heatmap;
 
  return { testmessage };
}

const actionCreators = {
  initHeatmap: heatmapActions.initHeatmap_action
};

export default connect(mapState, actionCreators)(App)