import React from 'react';
import AnimateDraggables from './AnimateDraggables.jsx';
import PlayerIcon from './PlayerIcon.jsx';


let AnimatePlayerIcons = React.createClass({

  statics: {spring: [300, 50]},

  getInitialState() {
    return {
      playerPositions: this.props.playerPositions
    };
  },

  componentWillReceiveProps(newProps) {
    this.setState({
      playerPositions: newProps.playerPositions
    });
  },

  handleEnter(interpolated, datum) {
    interpolated.isEntering = {val: 1};
    interpolated.scale = {val: 0.2, config: AnimatePlayerIcons.spring};
    interpolated.shadow = {val: 1, config: AnimatePlayerIcons.spring};
    interpolated.opacity = {val: 0, config: AnimatePlayerIcons.spring};
    interpolated.x = {val: datum.x, config: AnimatePlayerIcons.spring};
    interpolated.y = {val: datum.y, config: AnimatePlayerIcons.spring};
    return interpolated;
  },

  handleLeave(interpolated, datum) {
    return {
      isEntering: interpolated.isEntering,
      isLeaving: {val: 1},
      scale: {val: 0.4, config: AnimatePlayerIcons.spring},
      shadow: {val: 1, config: AnimatePlayerIcons.spring},
      opacity: {val: 0, config: AnimatePlayerIcons.spring},
      x: {val: interpolated.x.val, config: AnimatePlayerIcons.spring},
      y: {val: interpolated.y.val, config: AnimatePlayerIcons.spring}
    };
  },

  handleRelease() {
    this.props.onChange(this.state.playerPositions);
  },

  handleDrag(mouse, player, key) {
    const newPosition = this.findNearestPosition(mouse);
    const oldPosition = this.state.playerPositions.indexOf(player);
    if (newPosition !== null && newPosition !== oldPosition) {
      // swap items in array
      let arrData = this.state.playerPositions.slice();
      if (this.state.playerPositions.indexOf(player) === arrData.indexOf(player)) {
        let tmp = arrData[oldPosition];
        arrData[oldPosition] = arrData[newPosition];
        arrData[newPosition] = tmp;
      }
      this.setState({
        playerPositions: arrData
      });
    }
  },

  findNearestPosition(mouse) {
    let {coordinates} = this.props;
    let nearest = null;
    for (let i = 0; i < coordinates.length; i++) {
      let p = coordinates[i];
      // distance is from mouse to position (p).
      let distance = Math.abs(mouse.y - p.y) + Math.abs(mouse.x - p.x);
      if (
        // make sure mouse is somewhat close to position (p)
        distance < this.props.iconSize &&
        // compare distance from mouse to position (p).
        (
          nearest === null || (distance <
          // with distance from mouse to the previously nearest position.
          Math.abs(mouse.y - coordinates[nearest].y) +
          Math.abs(mouse.x - coordinates[nearest].x))
        )
      ) {
        nearest = i;
      }
    }
    return nearest;
  },

  render() {
    let coordinates = this.props.coordinates;
    return (
        <AnimateDraggables
          data={this.props.playerMap}
          onDrag={this.handleDrag}
          onRelease={this.handleRelease}
          onEndValue={(interpolated, datum, mouse) => {
            let isBeingMoved = datum.isBeingMoved;
            let pos = this.state.playerPositions.indexOf(datum.obj);
            let scale = pos > 15? 0.5 : 1.0;
            if (isBeingMoved) {
              scale *= 1.25;
            }
            interpolated.scale = {val: scale, config: AnimatePlayerIcons.spring};
            interpolated.shadow = {val: isBeingMoved? 16.0 : 1.0, config: AnimatePlayerIcons.spring};
            interpolated.x = {val: isBeingMoved? mouse.x : coordinates[pos].x, config: isBeingMoved? [] : AnimatePlayerIcons.spring};
            interpolated.y = {val: isBeingMoved? mouse.y : coordinates[pos].y, config: isBeingMoved? [] : AnimatePlayerIcons.spring};
          }}
          onWillLeave={this.handleLeave}
          onWillEnter={this.handleEnter}
          onItemsMoved={this.handleItemsMoved}
        >
          <PlayerIcon size={this.props.iconSize} />
        </AnimateDraggables>
    );
  }

});

export default AnimatePlayerIcons;