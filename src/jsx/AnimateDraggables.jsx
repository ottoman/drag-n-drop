import React from 'react';
import AnimatePosition from './AnimatePosition.jsx';


let AnimateDraggables = React.createClass({

  getInitialState() {
    return {
      mouse: {
        x: 0,
        y: 0,
        delta: {
          x: 0,
          y: 0
        }
      },
      isPressed: false,
      lastPressedKey: null
    };
  },

  handleEndValue(interpolated, datum) {
    let {mouse, lastPressedKey, isPressed} = this.state;
    // add some useful helper info
    datum.isBeingMoved = (lastPressedKey === datum.obj && isPressed);
    this.props.onEndValue(interpolated, datum, mouse);
  },

  componentDidMount() {
    window.addEventListener('touchmove', this.handleTouchMove);
    window.addEventListener('touchend', this.handleTouchEnd);
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
  },

  componentWillUnmount() {
    window.removeEventListener('touchmove', this.handleTouchMove);
    window.removeEventListener('touchend', this.handleTouchEnd);
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
  },

  handleTouchStart(interpolated, key, event) {
    event.stopPropagation();
    event.preventDefault();
    this.setIsDragging(interpolated, key, event.touches[0]);
  },

  handleTouchMove(event) {
    event.stopPropagation();
    let {pageX, pageY} = event.touches[0];
    this.setDragLocation(pageX, pageY);
  },

  handleTouchEnd() {
    event.stopPropagation();
    this.setDraggingReleased();
  },

  handleMouseDown(interpolated, key, event) {
    event.stopPropagation();
    event.preventDefault();
    this.setIsDragging(interpolated, key, event);
  },

  handleMouseMove(event) {
    event.stopPropagation();
    event.preventDefault();
    this.setDragLocation(event.pageX, event.pageY);
  },

  handleMouseUp(event) {
    event.stopPropagation();
    this.setDraggingReleased();
  },
  
  setIsDragging(interpolated, key, event) {
    let mouse = this.state.mouse;
    mouse.delta.x = event.pageX - interpolated.x.val;
    mouse.delta.y = event.pageY - interpolated.y.val;
    mouse.x = interpolated.x.val;
    mouse.y = interpolated.y.val;
    this.setState({
      mouse: mouse,
      isPressed: true,
      lastPressedKey: key
    });
  },

  setDragLocation(pageX, pageY) {
    if (this.state.isPressed) {
      let {data, mouse, lastPressedKey} = this.state;
      // calculate the moved item's new visual position
      mouse.x = pageX - mouse.delta.x;
      mouse.y = pageY - mouse.delta.y;
      this.props.onDrag(mouse, lastPressedKey);
      this.setState({
        mouse: mouse
      });
    }
  },

  setDraggingReleased() {
    let mouse = this.state.mouse;
    mouse.delta.x = 0;
    mouse.delta.y = 0;
    if (this.state.isPressed) {
      this.setState({
        isPressed: false,
        mouse: mouse
      });
      // notify parent that dragged item is released
      if (this.props.onRelease) {
        this.props.onRelease();
      }
    }
  },

  render() {
    let child = React.Children.only(this.props.children);
    return (
      <AnimatePosition
        data={this.props.data}
        // pass along handlers to Animate component
        onEndValue={this.handleEndValue}
        onWillLeave={this.props.onWillLeave}
        onWillEnter={this.props.onWillEnter}
      >
        {
          /*
            Render the child component passing additional
            mouse/touch handlers to the draggable component
          */
          React.cloneElement(child, {
            lastPressedKey: this.state.lastPressedKey,
            onTouchStart: this.handleTouchStart,
            onMouseDown: this.handleMouseDown
          })
        }
      </AnimatePosition>
    );
  }
});

export default AnimateDraggables;