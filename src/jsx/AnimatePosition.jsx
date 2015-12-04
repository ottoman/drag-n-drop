import React from 'react';
import {TransitionSpring} from 'react-motion/lib/Spring';


let AnimatePosition = React.createClass({

  prepareLocalDataState(data) {
    let map = {};
    Object.keys(data).forEach((key, index) => {
      let obj = data[key];
      map[key] = {
        datum: {
          val: {
            key: key,
            index: index,
            obj: obj
          },
          config: []
        },
        interpolated: {}
      };
    });
    return {
      map: map
    };
  },

  getInitialState() {
    return {
      data: this.prepareLocalDataState(this.props.data)
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

  endValue() {
    const {mouse, isPressed, data} = this.state;
    // call endValue callback for each key
    Object.keys(data.map).forEach((key) => {
      let datum = data.map[key].datum.val;
      let interpolated = data.map[key].interpolated;
      // set some helpful info on the data object here like isBeingMoved
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
      <TransitionSpring
        willEnter={this.willEnter}
        willLeave={this.willLeave}
        endValue={this.endValue}
      >
        {
          (items) => {
            return <div className={this.props.className + ' animated-list'}>
              {
                Object.keys(items).map((key) => {
                  let datum = items[key].datum.val;
                  let interpolated = items[key].interpolated;
                  // Pass interpolated values down to the animated item.
                  let childProps = Object.keys(interpolated).reduce((initial, prop) => {
                    initial[prop] = interpolated[prop].val;
                    return initial;
                  }, {});
                  childProps.key = key;
                  childProps.datum = datum;
                  childProps.interpolated = interpolated;

                  // clone the item
                  return React.cloneElement(React.Children.only(this.props.children), childProps);
                })
              }
            </div>;
          }
        }
      </TransitionSpring>
    );
  }

});

export default AnimatePosition;