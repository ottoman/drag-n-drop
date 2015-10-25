'use strict';

import React from 'react';
import {TransitionSpring} from 'react-motion/lib/Spring';

const verticalPadding = 10;
const springConfig = [300, 50];


// --------------------------------------------------------------------

const moveItemInArray = function(arr, fromPosition, toPosition) {
  const item = arr[fromPosition];
  arr.splice(fromPosition, 1); // delete item at fromPosition
  arr.splice(toPosition, 0, item); // insrt item at toPosition
};


// --------------------------------------------------------------------

let AnimatedList = React.createClass({

  getHeight(obj) {
    let result;
    if (typeof this.props.getHeight === 'function') {
      result = this.props.getHeight;
    } else if (typeof this.props.getHeight === 'number') {
      result = () => this.props.getHeight;
    } else if (typeof this.props.getHeight === 'string') {
      result = (o) => o[this.props.getHeight];
    } else {
      result = () => 100;
    }
    return result(obj);
  },

  prepareLocalDataState(data) {
    // build an array of the data plus some rendering helper info such as index and y-position.
    let array = data.map((obj, index) => {
      let height = this.getHeight(obj); // obj.height
      let item = {
        datum: {
          val: {
            key: obj.id,
            index: index,
            obj: obj,
            height: height,
            isBeingMoved: false
          },
          config: []
        },
        interpolated: {
          isEntering: {val: 0.0},
          isLeaving: {val: 0.0},
          height: {val: height, config: springConfig},
          scale: {val: 1.0, config: springConfig},
          shadow: {val: 1.0, config: springConfig},
          opacity: {val: 1.0, config: springConfig},
          width: {val: 320.0, config: []},
          x: {val: 0.0, config: springConfig},
          y: {val: 0.0, config: springConfig}
        }
      };
      return item;
    });
    // add y start and end position to each object
    this.setYCoordinates(array);
    // also store the data in a map so it can be accessed by key instead of index.
    let map = array.reduce((initial, item) => {
      initial[item.datum.val.key] = item;
      return initial;
    }, {});
    // state.data will contain both a map and an array of the items to animate.
    return {
      map: map,
      array: array
    };
  },

  setYCoordinates(array) {
    // add y start and end position to each object
    array.reduce((initial, item, i) => {
      let obj = item.datum.val;
      array[i].datum.val.y = {start: initial, end: initial + (obj.height + verticalPadding)};
      return initial + (obj.height + verticalPadding);
    }, 0);
  },

  getInitialState() {
    return {
      delta: 0,
      mouse: 0,
      isPressed: false,
      lastPressedKey: null,
      data: this.prepareLocalDataState(this.props.data),
      // clientHeight: clientHeight
    };
  },

  // When the array of items have been changed in parent component,
  // this method will update the state of this component.
  componentWillReceiveProps(newProps) {
    let {data} = newProps;
    this.setState({
      data: this.prepareLocalDataState(data)
    });
  },

  componentDidMount() {
    // window.addEventListener('touchmove', this.handleTouchMove);
    // window.addEventListener('touchend', this.handleMouseUp);
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);

    // check height of the container
    let clientHeight = this.refs.aniList.getDOMNode().clientHeight;
    console.log('clientHeight', clientHeight);
    this.setState({
      clientHeight: clientHeight
    });
  },

  componentWillUnmount() {
    // window.removeEventListener('touchmove', this.handleTouchMove);
    // window.removeEventListener('touchend', this.handleMouseUp);
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
  },

  handleTouchStart(item, key, event) {
    this.handleMouseDown(item, key, event.touches[0]);
  },

  handleTouchMove(event) {
    event.preventDefault();
    this.handleMouseMove(event.touches[0]);
  },

  handleMouseDown(item, key, event) {
    event.stopPropagation();
    event.preventDefault();

    this.setState({
      delta: event.pageY - item.y.val,
      mouse: item.y.val,
      isPressed: true,
      lastPressedKey: key
    });
  },

  handleMouseUp(event) {
    event.stopPropagation();
    event.preventDefault();

    // TODO: send action to store if items did move around!
    // if (this.state.isReordered) {
    //   let array = this.state.data.array.map((d) => d.datum.val.obj);
    //   this.props.onReOrdered(array);
    // }
    this.setState({
      // isReordered: false,
      isPressed: false,
      delta: 0
    });
  },

  handleMouseMove(event) {
    event.stopPropagation();
    event.preventDefault();

    // console.log('move', this.state);

    if (this.state.isPressed) {
      let {data, delta, lastPressedKey} = this.state;
      // calculate the moved item's new visual position
      const mouse = event.pageY - delta;
      const oldItem = data.map[lastPressedKey].datum.val;
      const oldIndex = oldItem.index;
      const newIndex = this.calculateIndexForYposition(mouse, oldIndex);

      if (newIndex !== oldIndex) {
        // this code will update the store immediately
        let arrData = this.props.data;
        moveItemInArray(arrData, oldIndex, newIndex);
        data = this.prepareLocalDataState(arrData);
        // this.props.onMoveItem(oldIndex, newIndex, arrData);

        // // change positions in local state. Store is updated on mouseup.
        // this.setState({
        //   isReordered: true
        // });
        // moveItemInArray(data.array, oldIndex, newIndex);
        // data.array[oldIndex].index = oldIndex;
        // data.array[newIndex].index = newIndex;
        // this.setYCoordinates(data.array);
      }



      this.setState({
        mouse: mouse,
        data: data
      });

    }

  },

  calculateIndexForYposition(mouse, oldIndex) {
    let {data} = this.state;
    let height = this.getHeight(this.props.data[oldIndex]);
    let mouseY = mouse + (height / 2);
    // let mouseY = mouse + (this.props.data[oldIndex].height / 2);

    // find the item in array closest to the mouse position
    let nearest = 0;
    for (let i = 1; i < data.array.length; i++) { // note. skipping item at zero intentionally!
      if (
        // compare distance from mouse to end of this item...
        Math.abs(mouseY - data.array[i].datum.val.y.end) <
        // with distance from mouse to start of previous item.
        Math.abs(mouseY - data.array[nearest].datum.val.y.start)
      ) {
        nearest = i;
      }
    }
    return nearest;
  },

  wasLastPressed(key) {
    return this.state.lastPressedKey === key;
  },

  // shouldComponentUpdate: function(nextProps, nextState) {
  //   return false;
  // },

  endValue() {
    const {mouse, isPressed, data} = this.state;
    // call endValue callback for each key
    Object.keys(data.map).forEach((key) => {
      let datum = data.map[key].datum.val;
      let interpolated = data.map[key].interpolated;
      // set some helpful info on the data object here like isBeingMoved
      datum.isBeingMoved = this.wasLastPressed(key) && isPressed;
      interpolated.isEntering = {val: 0.0};
      interpolated.isLeaving = {val: 0.0};
      // callback
      this.props.onEndValue(interpolated, datum, mouse);
    });

    return this.state.data.map;
  },

  willEnter(key, itemEntering, endValue, currValue, currVelocity) {
    return {
      interpolated: this.props.onWillEnter(itemEntering.interpolated, itemEntering.datum.val),
      datum: itemEntering.datum
    };
  },

  willLeave(key, itemLeaving, endValue, currValue, currVelocity) {
    // hack! check if animation is complete and return null. This is needed
    // to stop rendering the element.
    if (currValue[key].datum.val.isLeaving.val === 1.0) {
      return null;
    }
    // run supplied callback
    return {
      interpolated: this.props.onWillLeave(itemLeaving.interpolated, itemLeaving.datum.val),
      datum: itemLeaving.datum
    };
  },

  render() {
    return (
      <div ref="aniList" style={{
        height: '100%', // maximize to parent element height so that
        // overflow: 'hidden'
      }}>

        <TransitionSpring
          willEnter={this.willEnter}
          willLeave={this.willLeave}
          endValue={this.endValue}
        >
          {
            (items) => {
              return <div className="animated-list">
                {
                  Object.keys(items).map((key) => {
                    let datum = items[key].datum.val;
                    let interpolated = items[key].interpolated;

                    // use interpolated value to determine if the item is "animating in/out"
                    let isEntering = datum.isEntering = !!interpolated.isEntering.val;
                    let isLeaving = datum.isLeaving = !!interpolated.isLeaving.val;
                    datum.wasLastPressed = this.wasLastPressed(key);

                    // disable event handlers if this item is "animating away"
                    let {handleMouseDown, handleTouchStart} = this;
                    // if (isEntering || isLeaving) {
                    //   handleMouseDown = handleTouchStart = () => null;
                    // }

                    let AnimationItem = this.props.AnimationItem;

                    if (interpolated.y.val > this.state.clientHeight) {
                      // just return null for elements outside of the viewbox
                      return null;
                    }

                    let result = (
                      <AnimationItem
                        key={datum.key}
                        datum={datum}
                        interpolated={interpolated}
                        onMouseDown={handleMouseDown.bind(null, interpolated, key) }
                        onTouchStart={handleTouchStart.bind(null, interpolated, key)}
                      />
                    );
                    return result;

                  })
                }
              </div>;
            }
          }
        </TransitionSpring>
      </div>
    );
  }

});

export default AnimatedList;