import * as React from 'react';
import {ListItem} from 'material-ui/List';
import KeyBoardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import KeyBoardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';

type Props = {
  primaryText: string,
  expandComponent: JSX.Element
};
type State = {
  expanded: boolean
};
export default class ExpandableListItem extends React.Component<Props, State> {
  constructor(props: Props){
    super(props);
    this.state = { expanded: false };
  }
  toggleExpanded = () => {
    if (this.state.expanded){
      this.setState({expanded: false});
    }
    else{
      this.setState({expanded: true});
    }
  }
  render(){
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
}
