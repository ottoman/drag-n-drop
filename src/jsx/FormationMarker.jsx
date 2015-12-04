'use strict';

import React from 'react';

let FormationMarker = React.createClass({

  render() {
    let {datum, size, x, y} = this.props;
    let transform = `translate3d(-50%, -50%, 0) translate3d(${x}px, ${y}px, 0px)`;
    return (
      <div
        className="formation-marker"
        style={{
          width: size,
          height: size,
          transform: transform,
          WebkitTransform: transform,
          MozTransform: transform
        }}
      />
    );
  }
});

export default FormationMarker;