var React = require('react');
import AppBar from 'material-ui/lib/app-bar';
var TrainingCharts = require('./trainingcharts');
var ParameterCharts = require('./parameterchart');
var NetworkDashboard = require('./components/network/networkdashboard');
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import ActionGrade from 'material-ui/lib/svg-icons/action/grade';
import Timeline from 'material-ui/lib/svg-icons/action/timeline';
import ActionLineStyle from 'material-ui/lib/svg-icons/action/line-style'

var Dashboard = React.createClass({
  getInitialState(){
      return {
          showTraining: false,
          showParameters: false,
          showWeights: false,
      }
  },
  showTraining(){
    this.setState({
      showTraining: true,
      showParameters: false,
      showWeights: false,
    });
  },
  showParameters(){
    this.setState({
      showTraining: false,
      showParameters: true,
      showWeights: false,
    });
  },
  showWeights(){
    this.setState({
      showTraining: false,
      showParameters: false,
      showWeights: true,
    });
  },
  render: function(){
    return(
    <div>
      <AppBar title="Logo" />

      <div className="row">
        <div className="col s2 z-depth-1 grey lighten-3">
          <List className="grey lighten-3">
            <ListItem primaryText="Training" leftIcon={<Timeline />} onClick={this.showTraining}/>
            <ListItem primaryText="Parameters" leftIcon={<ActionGrade />} onClick={this.showParameters}/>
            <ListItem primaryText="Networks" leftIcon={<ActionLineStyle />} onClick={this.showWeights}/>
          </List>
        </div>

        <div className="col s10">
          { this.state.showTraining ? <TrainingCharts /> : null}
          { this.state.showParameters ? <ParameterCharts /> : null}
          { this.state.showWeights ? <NetworkDashboard /> : null}
        </div>
      </div>
    </div>
    );
  }
});

module.exports = Dashboard;
