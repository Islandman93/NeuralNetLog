var React = require('react');
import ListItem from 'material-ui/lib/lists/list-item';
import KeyBoardArrowUp from 'material-ui/lib/svg-icons/hardware/keyboard-arrow-up';
import KeyBoardArrowDown from 'material-ui/lib/svg-icons/hardware/keyboard-arrow-down';

var ExpandableListItem = React.createClass({
  getInitialState(){
    return {
      expanded: false,
    };
  },
  toggleExpanded(){
    if (this.state.expanded){
      this.setState({expanded: false});
    }
    else{
      this.setState({expanded: true});
    }
  },
  render: function(){
    return(
      <div className="row" style={{marginBottom: '0px'}}>
      <ListItem
        primaryText={this.props.primaryText}
        onClick={this.toggleExpanded}
        rightIcon={this.state.expanded ? <KeyBoardArrowUp /> : <KeyBoardArrowDown />}
      />

      {this.state.expanded ?
        <div className="col s11 offset-s1">
          {this.props.expandComponent}
        </div>
       : null
      }
      </div>
    );
  }
});

module.exports = ExpandableListItem;
