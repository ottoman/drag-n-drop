import React from 'react';

let ButtonGroup = React.createClass({

  render() {
    return (
      <div style={Object.assign({
        width: 200
      }, this.props.style)} className="btn-group">
        {this.props.children}
      </div>
    );
  }

});

export default ButtonGroup;