import * as React from 'react';
import * as statsAPI from '../data/Stats';
import * as c3 from 'c3';
import * as _ from 'lodash';

export default class StatCharts extends React.Component<{}, {}> {
  statChart: c3.ChartAPI;
  constructor(props: {}) {
    super(props);
    this.statChart = null;
  }
  componentDidMount(){
    statsAPI.loadData(this.handleLoadStats);
  }
  handleLoadStats = (xs, columnData) => {
    this.statChart.load({
        xs: xs,
        columns: _.values(columnData)
    } as any);  // Fix TS error, xs does exist on load
  }
  generateChart(node){
    let chart = c3.generate({
      bindto: node,
      data: {
        columns: []
      },
      zoom: {
        enabled: true,
        rescale: true
      },
    });
    return chart;
  }
  render(){
    return(
      <div>
        <div ref={
          (node) => {
            this.statChart = this.generateChart(node);
          }
        } />
      </div>
    );
  }
}
