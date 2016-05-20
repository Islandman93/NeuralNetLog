var React = require('react');
var helper = require('./traininghelper');

var TrainingChart = React.createClass({
  lossChart: null,
  scoreChart: null,

  componentDidMount(){
    helper.loadData(this.loadLoss, this.loadScore);
  },
  loadLoss(columnXs, mbData){
    this.lossChart.load({
        xs: columnXs,
        columns: mbData
    });
  },
  updateLossAxis(newRange){
    this.lossChart.axis.range(newRange);
  },
  loadScore(columnXs, scoreData){
    this.scoreChart.load({
        xs: columnXs,
        columns: scoreData
    });
  },
  render: function(){
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
});

module.exports = TrainingChart;
