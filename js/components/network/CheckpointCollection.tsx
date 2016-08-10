import * as React from 'react';
import {List, ListItem} from 'material-ui/List';

type Props = {
  onClick: (checkpoint: any) => void,
  checkpointCollection: any[]
};
export default class CheckpointCollection extends React.Component<Props, {}> {
  buildClickFn(checkpoint){
    return () => {this.props.onClick(checkpoint)};
  }
  render(){
    return(
      <List className="grey lighten-4">
        {this.props.checkpointCollection.map((checkpoint, i) => {
          return(
            <ListItem
              key={i}
              primaryText={'Epoch: ' + checkpoint.epoch}
              onClick={this.buildClickFn(checkpoint)}
            />
          );
        })}
      </List>
    );
  }
}
