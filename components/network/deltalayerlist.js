var React = require('react');
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
var ExpandableListItem = require('./../util/expandablelistitem');
var Layer = require('./layer');

var DeltaLayerList = React.createClass({
  getDeltaWeights: function(){
    this.props.checkpoint1.weights[i].values
    this.props.checkpoint2.weights[i].values
  },
  render: function(){
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
            <ExpandableListItem key={i} primaryText={name} expandComponent={<Layer layer={this.getDeltaWeights()} />} />
          );
        })}
      </List>
    );
  }
});

module.exports = DeltaLayerList;
