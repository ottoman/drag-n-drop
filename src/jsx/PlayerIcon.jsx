import React from 'react';
import SvgPlayerIcon from './svg-player-icon/main.coffee';


let PlayerIcon = React.createClass({

  shouldComponentUpdate(newProps) {
    let oldProps = this.props;
    return oldProps.x !== newProps.x ||
      oldProps.y !== newProps.y ||
      oldProps.lastPressedKey !== newProps.lastPressedKey ||
      oldProps.scale !== newProps.scale;
  },

  render() {
    let {datum, interpolated, scale, shadow, opacity, x, y, lastPressedKey} = this.props;
    // Set a higher z-order on the item that was last moved.
    let z;
    if (datum.isLeaving || datum.isEntering) {
      z = 0;
    } else if (lastPressedKey === datum.obj) {
      z = 99999;
    } else {
      z = 1000 + datum.index;
    }
    let transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale}) translateZ(0)`;
    return (
      <div
        key={datum.key}
        className="animated-item"
        style={{
          zIndex: z,
          width: this.props.size,
          height: this.props.size,
          boxShadow: `rgba(0, 0, 0, 0.5) 0px ${shadow}px ${2 * shadow}px 0px`,
          transform: transform,
          WebkitTransform: transform,
          MozTransform: transform
        }}
        onMouseDown={this.props.onMouseDown.bind(null, interpolated, datum.obj)}
        onTouchStart={this.props.onTouchStart.bind(null, interpolated, datum.obj)}
      >
        <SvgPlayerIcon className="animated-item" playerImage={datum.obj} />
      </div>
    );
  }
  
});


export default PlayerIcon;