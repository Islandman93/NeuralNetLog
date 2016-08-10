import * as React from 'react';
import GroupedCheckpointCollection from './GroupedCheckpointCollection';
import * as ParmAPI from '../../data/Parameters';
import * as CheckpointAPI from '../../data/Checkpoints';
import LayerList from './LayerList';
import DeltaLayerList from './DeltaLayerList';
import {List, ListItem} from 'material-ui/List';
import Toggle from 'material-ui/Toggle';

type State = {
  groupedCheckpointList?: any[],
  currentCheckpoint?: any,
  compareCheckpoint?: any,
  comparing?: boolean,
  deltaing?: boolean
}
export default class Component extends React.Component<{}, State> {
  constructor(){
    super();
    this.state = {
      groupedCheckpointList: [],
      currentCheckpoint: false,
      compareCheckpoint: false,
      comparing: false,
      deltaing: false
    };
  }
  componentDidMount(){
    CheckpointAPI.getGroupedCheckpoints((groupedCheckpointList) => {this.setState({groupedCheckpointList})});
  }
  checkpointClick(checkpoint){
    ParmAPI.getParm(checkpoint.weightFile, (parm) => {
      checkpoint.weights = parm;
      if(!this.state.comparing){
        this.setState({currentCheckpoint: checkpoint});
      }
      else{
        this.setState({compareCheckpoint: checkpoint});
      }
    });
  }
  toggleCompare(){
    if(this.state.comparing){
      this.setState({comparing: false});
    }
    else{
      this.setState({comparing: true});
    }
  }
  toggleDelta(){
    if(this.state.deltaing){
      this.setState({deltaing: false});
    }
    else{
      this.setState({deltaing: true});
    }
  }
  render(){
    return(
      <div className="row">
        <div className="col s2 z-depth-1 grey lighten-4">
          <GroupedCheckpointCollection groupedCheckpointCollection={this.state.groupedCheckpointList} onClick={this.checkpointClick}/>
        </div>
        <div className="col s10">
          <List subheader="Network Functions" className="grey lighten-5" zDepth={1}>
            <ListItem primaryText="Compare" rightToggle={<Toggle onToggle={this.toggleCompare} />} />
            {this.state.comparing ? <ListItem primaryText="Show Delta" rightToggle={<Toggle onToggle={this.toggleDelta} />} /> : null}
          </List>
        </div>
        <div className={this.state.comparing ? (this.state.deltaing ? "col s3" : "col s5") : "col s10"}>
          {this.state.currentCheckpoint ?
            <LayerList subheader={this.state.currentCheckpoint.weightFile} checkpoint={this.state.currentCheckpoint}/>
            : null
          }
        </div>
        {this.state.deltaing ?
          <div className="col s3">
            {this.state.comparing && this.state.compareCheckpoint ?
              <DeltaLayerList checkpoint1={this.state.currentCheckpoint} checkpoint2={this.state.compareCheckpoint}/>
              : null
            }
          </div>
          : null
        }
        <div className={this.state.comparing ? (this.state.deltaing ? "col s3" : "col s5") : null}>
          {this.state.comparing && this.state.compareCheckpoint ?
            <LayerList subheader={this.state.compareCheckpoint.weightFile} checkpoint={this.state.compareCheckpoint}/>
            : null
          }
        </div>
      </div>
    );
  }
}
