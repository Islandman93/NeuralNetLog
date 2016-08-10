import * as React from 'react';
import * as helper from '../../data/Training';

export default class TrainingChart extends React.Component<{}, {}> {
  lossChart: c3.ChartAPI;
  scoreChart: c3.ChartAPI;

  componentDidMount(){
    helper.loadData(this.loadLoss, this.loadScore);
  }
  loadLoss(columnXs, mbData){
    this.lossChart.load({
        xs: columnXs,
        columns: mbData
    });
  }
  updateLossAxis(newRange){
    this.lossChart.axis.range(newRange);
  }
  loadScore(columnXs, scoreData){
    this.scoreChart.load({
        xs: columnXs,
        columns: scoreData
    });
  }
  render(){
    return(
      <div>
        <div className="section">
          <h5>Loss Chart</h5>
          <div ref={
            (node) => {
              this.lossChart = helper.generateLossChart(node);
            }
          } />
        </div>

        <div className="section">
          <h5>Result Chart</h5>
            <div ref={
              (node) => {
                this.scoreChart = helper.generateScoreChart(node);
              }
            } />
        </div>
      </div>
    );
  }
}
