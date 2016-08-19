import * as React from 'react';
import {List} from 'material-ui/List';
import ExpandableListItem from '../util/ExpandableListItem';
import {CheckpointCollection} from './CheckpointCollection';
import {Checkpoint, GroupedCheckpoints} from '../../data/Checkpoints';

type Props = {
  onClick: (checkpoint: Checkpoint) => void,
  groupedCheckpointCollection: GroupedCheckpoints[]
};
export class GroupedCheckpointCollection extends React.Component<Props, {}> {
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
