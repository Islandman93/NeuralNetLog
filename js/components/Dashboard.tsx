import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import EventCharts from './events/EventCharts';
import ParameterCharts from './parameterchart';
import NetworkDashboard from './network/NetworkDashboard';
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Timeline from 'material-ui/svg-icons/action/timeline';
import ActionLineStyle from 'material-ui/svg-icons/action/line-style'

enum Routes {
  Events,
  Stats,
  Checkpoints
}
type State = {
  currentRoute?: Routes
};
export default class Dashboard extends React.Component<{}, State> {
  constructor(){
    super();
    this.state = {
      currentRoute: Routes.Events
    };
  }
  render(){
    let mainComponent: JSX.Element = null;
    switch(this.state.currentRoute){
      case Routes.Events:
        mainComponent = <EventCharts />;
        break;
      case Routes.Stats:
        mainComponent = <ParameterCharts />;
        break;
      case Routes.Checkpoints:
        mainComponent = <NetworkDashboard />;
        break;
    }
    return(
      <div>
        <AppBar title="Neural Network Log"/>

        <div className="row">
          <div className="col s2 z-depth-1 grey lighten-3">
            <List className="grey lighten-3">
              <ListItem primaryText="Events" leftIcon={<Timeline />} onClick={()=>{this.setState({currentRoute: Routes.Events})}}/>
              <ListItem primaryText="Network Stats" leftIcon={<ActionGrade />} onClick={()=>{this.setState({currentRoute: Routes.Stats})}}/>
              <ListItem primaryText="Network Checkpoints" leftIcon={<ActionLineStyle />} onClick={()=>{this.setState({currentRoute: Routes.Checkpoints})}}/>
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
