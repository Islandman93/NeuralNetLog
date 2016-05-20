var React = require('react');
var Checkpoints = require('./data/checkpoints');
var c3 = require('c3');

var ParameterChart = React.createClass({
  parameterChart: null,

  componentDidMount(){
    Checkpoints.loadCheckpoints(this.loadParms);
  },
  loadParms(data, legendNames){
    this.parameterChart.load({
        json: data,
        keys: {
            x: 'xstep',
            value: legendNames,
        }
    });
  },
  generateChart(node){
    var chart = c3.generate({
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
  },
  render: function(){
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
});

module.exports = ParameterChart;
