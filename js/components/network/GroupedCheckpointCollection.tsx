import * as React from 'react';
import {List} from 'material-ui/List';
import ExpandableListItem from '../util/ExpandableListItem';
import CheckpointCollection from './CheckpointCollection';

type Props = {
  onClick: (checkpoint) => void,
  groupedCheckpointCollection: {
    checkpoints: any,
    range: {
      min: number,
      max: number
    }
  }[]
};
export default class GroupedCheckpointCollection extends React.Component<Props, {}> {
  render(){
    return(
      <List className="grey lighten-4">
        {this.props.groupedCheckpointCollection.map((group, i) => {
          return(
            <ExpandableListItem
              key={i}
              primaryText={'Epoch: ' + group.range.min + ' - ' + group.range.max}
              expandComponent={<CheckpointCollection checkpointCollection={group.checkpoints} onClick={this.props.onClick} />}
            />
          );
        })}
      </List>
    );
  }
}
