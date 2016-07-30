import * as React from 'react';
import * as Drawing from './layerdrawing/Drawing';

type Props = {
  layer: any
};
export default class Layer extends React.Component<Props, {}> {
  rootNode: HTMLDivElement;
  constructor(props: Props){
    super(props);
    this.rootNode = null;
  }
  componentDidMount(){
    let node = this.rootNode;
    Drawing.drawLayer(node, this.props.layer);
  }
  componentDidUpdate(){
    // remove old children and draw new ones
    let node = this.rootNode;
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
    Drawing.drawLayer(node, this.props.layer);
  }
  render(){
    return(
      <div ref={
        (node) => {
          this.rootNode = node;
        }
      } />
    );
  }
}
