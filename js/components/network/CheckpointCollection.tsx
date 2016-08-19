import * as React from 'react';
import {List, ListItem} from 'material-ui/List';
import {Checkpoint} from '../../data/Checkpoints';

type Props = {
  onClick: (checkpoint: Checkpoint) => void,
  checkpointCollection: Checkpoint[]
};
export class CheckpointCollection extends React.Component<Props, {}> {
  buildClickFn(checkpoint: Checkpoint){
    return () => {this.props.onClick(checkpoint)};
  }
  render(){
    return(
      <List className="grey lighten-4">
        {this.props.checkpointCollection.map((checkpoint, i) => {
          return(
            <ListItem
              key={i}
              primaryText={'Epoch: ' + checkpoint.step}
              onClick={this.buildClickFn(checkpoint)}
            />
          );
        })}
      </List>
    );
  }
}
