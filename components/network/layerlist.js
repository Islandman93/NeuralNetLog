var React = require('react');
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
var ExpandableListItem = require('./../util/expandablelistitem');
var Layer = require('./layer');

var LayerList = React.createClass({
  render: function(){
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
});

module.exports = LayerList;
