var React = require('react');
var drawing = require('./layerdrawing/drawing');


var Layer = React.createClass({
  canvas: null,
  componentDidMount(){
    let node = this.rootNode;
    drawing.drawLayer(node, this.props.layer);
  },
  componentDidUpdate(){
    // remove old children and draw new ones
    let node = this.rootNode;
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
    drawing.drawLayer(node, this.props.layer);
  },
  render: function(){
    return(
      <div ref={
        (node) => {
          this.rootNode = node;
        }
      } />
    );
  }
});

module.exports = Layer;
