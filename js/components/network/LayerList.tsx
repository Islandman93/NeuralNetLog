import * as React from 'react';
import {List} from 'material-ui/List';
import ExpandableListItem from './../util/ExpandableListItem';
import Layer from './Layer';

type LayerType = {
  type: string,
  index: number,
  shape: number[],
  description?: string
}
type Props = {
  checkpoint: {
    networkshape: LayerType[],
    weights: any[],
  },
  subheader: string
}
export default class LayerList extends React.Component<Props, {}> {
  render(){
    return(
      <List subheader={this.props.subheader} className="grey lighten-5" zDepth={1}>
        {this.props.checkpoint.networkshape.map((layer, i) => {
          let name = '';
          name += layer.type.toUpperCase() + layer.index;
          name += ' | (' + layer.shape + ')';
          if(layer.description.length > 0){
            name += ' | ' + layer.description;
          }
          return(
            <ExpandableListItem key={i} primaryText={name} expandComponent={<Layer layer={this.props.checkpoint.weights[i].values} />} />
          );
        })}
      </List>
    );
  }
}
