import * as React from 'react';
import {List} from 'material-ui/List';
import ExpandableListItem from '../util/ExpandableListItem';
import Layer from './Layer';

type Props = {
  checkpoint1: any,
  checkpoint2: any
};
export default class DeltaLayerList extends React.Component<Props, {}> {
  getDeltaWeights(i: number){
    this.props.checkpoint1.weights[i].values
    this.props.checkpoint2.weights[i].values
  }
  render(){
    return(
      <List subheader={this.props.checkpoint1.weightFile + ' - ' + this.props.checkpoint2.weightFile} className="grey lighten-5" zDepth={1}>
        {this.props.checkpoint1.networkshape.map((layer, i) => {
          let name = '';
          name += layer.type.toUpperCase() + layer.index;
          name += ' | (' + layer.shape + ')';
          if(layer.description.length > 0){
            name += ' | ' + layer.description;
          }
          return(
            <ExpandableListItem key={i} primaryText={name} expandComponent={<Layer layer={this.getDeltaWeights(i)} />} />
          );
        })}
      </List>
    );
  }
}
