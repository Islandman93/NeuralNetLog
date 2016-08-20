import * as React from 'react';
import * as _ from 'lodash';
import * as eventAPI from '../../data/Events';

export default class EventCharts extends React.Component<{}, {}> {
  eventChart: c3.ChartAPI;
  constructor(props: {}){
    super(props);
    this.eventChart = null;
  }
  componentDidMount(){
    eventAPI.loadData(this.handleLoadFinished);
  }
  handleLoadFinished = (columnXs: eventAPI.EventXs, chartData: eventAPI.EventData) => {
    this.eventChart.load({
        xs: columnXs,
        columns: _.values(chartData)
    } as any);  // Fix TS error, load does allow xs
  }
  render(){
    return(
      <div>
        <div className="section">
          <h5>Events</h5>
          <div ref={
            (node) => {
              this.eventChart = eventAPI.generateChart(node);
            }
          } />
        </div>
      </div>
    );
  }
}
