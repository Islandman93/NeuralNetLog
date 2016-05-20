var React = require('react');
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
var ExpandableListItem = require('./../util/expandablelistitem');
var CheckpointCollection = require('./CheckpointCollection');


var GroupedCheckpointCollection = React.createClass({
  render: function(){
    return(
      <List className="grey lighten-4">
        {this.props.groupedCheckpointCollection.map(function(group, i){
          return(
            <ExpandableListItem
              key={i}
              primaryText={'Epoch: ' + group.range.min + ' - ' + group.range.max}
              expandComponent={<CheckpointCollection checkpointCollection={group.checkpoints} onClick={this.props.onClick} />}
            />
          );
        }.bind(this))}
      </List>
    );
  }
});

module.exports = GroupedCheckpointCollection;
