import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import TrainingCharts from './training/TrainingCharts';
import ParameterCharts from './parameterchart';
import NetworkDashboard from './network/NetworkDashboard';
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Timeline from 'material-ui/svg-icons/action/timeline';
import ActionLineStyle from 'material-ui/svg-icons/action/line-style'

enum Routes {
  Training,
  Parameters,
  Networks
}
type State = {
  currentRoute?: Routes
};
export default class Dashboard extends React.Component<{}, State> {
  constructor(){
    super();
    this.state = {
      currentRoute: Routes.Training
    };
  }
  render(){
    let mainComponent: JSX.Element = null;
    switch(this.state.currentRoute){
      case Routes.Training:
        mainComponent = <TrainingCharts />;
        break;
      case Routes.Parameters:
        mainComponent = <ParameterCharts />;
        break;
      case Routes.Networks:
        mainComponent = <NetworkDashboard />;
        break;
    }
    return(
      <div>
        <AppBar title="Neural Network Log" />

        <div className="row">
          <div className="col s2 z-depth-1 grey lighten-3">
            <List className="grey lighten-3">
              <ListItem primaryText="Training" leftIcon={<Timeline />} onClick={()=>{this.setState({currentRoute: Routes.Training})}}/>
              <ListItem primaryText="Parameters" leftIcon={<ActionGrade />} onClick={()=>{this.setState({currentRoute: Routes.Parameters})}}/>
              <ListItem primaryText="Networks" leftIcon={<ActionLineStyle />} onClick={()=>{this.setState({currentRoute: Routes.Networks})}}/>
            </List>
          </div>

          <div className="col s10">
            {mainComponent}
          </div>
        </div>
      </div>
    );
  }
}
