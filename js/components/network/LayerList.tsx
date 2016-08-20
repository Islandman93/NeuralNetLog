import * as React from 'react';
import {List} from 'material-ui/List';
import ExpandableListItem from './../util/ExpandableListItem';
import Layer from './Layer';
import {Checkpoint} from '../../data/Checkpoints';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import * as _ from 'lodash';

type Props = {
  checkpoint: Checkpoint,
  subheader: string
};
export default class LayerList extends React.Component<Props, {}> {
  render(){
    let expandableListItems: JSX.Element[] = [];
    _.mapKeys(this.props.checkpoint.values, (layer, layerName) => {
      let name = layerName + ' (' + layer.shape + ')';
      expandableListItems.push(
        <ExpandableListItem key={layerName} primaryText={name} expandComponent={<Layer layer={layer} />} />
      );
    });
    return(
      <Paper zDepth={1}>
        <List className="grey lighten-5" zDepth={1}>
          <Subheader>{this.props.subheader}</Subheader>
          {expandableListItems}
        </List>
      </Paper>
    );
  }
}
