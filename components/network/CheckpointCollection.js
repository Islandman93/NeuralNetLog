var React = require('react');
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

var CheckpointCollection = React.createClass({
  buildClickFn(checkpoint){
    return () => {this.props.onClick(checkpoint)};
  },
  render: function(){
    return(
      <List className="grey lighten-4">
        {this.props.checkpointCollection.map(function(checkpoint, i){
          return(
            <ListItem
              key={i}
              primaryText={'Epoch: ' + checkpoint.epoch}
              onClick={this.buildClickFn(checkpoint)}
            />
          );
        }.bind(this))}
      </List>
    );
  }
});

module.exports = CheckpointCollection;
