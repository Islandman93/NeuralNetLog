import * as React from 'react';
import {GroupedCheckpointCollection} from './GroupedCheckpointCollection';
import * as CheckpointAPI from '../../data/Checkpoints';
import LayerList from './LayerList';
import DeltaLayerList from './DeltaLayerList';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import Toggle from 'material-ui/Toggle';

type State = {
  groupedCheckpointList?: CheckpointAPI.GroupedCheckpoints[],
  currentCheckpoint?: CheckpointAPI.Checkpoint,
  compareCheckpoint?: CheckpointAPI.Checkpoint,
  comparing?: boolean,
  deltaing?: boolean
}
export default class Component extends React.Component<{}, State> {
  constructor(){
    super();
    this.state = {
      groupedCheckpointList: [],
      currentCheckpoint: null,
      compareCheckpoint: null,
      comparing: false,
      deltaing: false
    };
  }
  componentDidMount(){
    CheckpointAPI.getGroupedCheckpoints((groupedCheckpointList) => {this.setState({groupedCheckpointList})});
  }
  handleCheckpointClick = (checkpoint: CheckpointAPI.Checkpoint) => {
    if(!this.state.comparing){
      this.setState({currentCheckpoint: checkpoint});
    }
    else{
      this.setState({compareCheckpoint: checkpoint});
    }
  }
  handleToggleCompare = () => {
    this.setState({comparing: !this.state.comparing});
  }
  handleToggleDelta = () => {
    this.setState({deltaing: !this.state.deltaing});
  }
  render(){
    return(
      <div className="row">
        <div className="col s2">
          <Paper zDepth={1}>
            <GroupedCheckpointCollection groupedCheckpointCollection={this.state.groupedCheckpointList} onClick={this.handleCheckpointClick}/>
          </Paper>
        </div>
        <div className="col s10">
          <Paper zDepth={1}>
            <List className="grey lighten-5">
              <Subheader>Network Functions</Subheader>
              <ListItem primaryText="Compare" rightToggle={<Toggle onToggle={this.handleToggleCompare} />} />
              {//this.state.comparing ? <ListItem primaryText="Show Delta" rightToggle={<Toggle onToggle={this.handleToggleDelta} />} /> : null}
              }
            </List>
          </Paper>
        </div>
        <div className={this.state.comparing ? (this.state.deltaing ? "col s3" : "col s5") : "col s10"}>
          {this.state.currentCheckpoint ?
            <LayerList subheader={'Step: ' + this.state.currentCheckpoint.step} checkpoint={this.state.currentCheckpoint}/>
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
            <LayerList subheader={'Step: ' + this.state.compareCheckpoint.step} checkpoint={this.state.compareCheckpoint}/>
            : null
          }
        </div>
      </div>
    );
  }
}
