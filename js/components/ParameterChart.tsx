import * as React from 'react';
import * as Checkpoints from '../data/Checkpoints';
import * as c3 from 'c3';

export default class ParameterChart extends React.Component<{}, {}> {
  parameterChart: c3.ChartAPI;
  componentDidMount(){
    Checkpoints.loadCheckpoints(this.loadParms);
  }
  loadParms(data, legendNames){
    this.parameterChart.load({
        json: data,
        keys: {
            x: 'xstep',
            value: legendNames,
        }
    });
  }
  generateChart(node){
    let chart = c3.generate({
            bindto: node,
            data: {
                json: [],
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
            this.parameterChart = this.generateChart(node);
          }
        } />
      </div>
    );
  }
}
