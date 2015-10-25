'use strict';

import React from 'react';
import listenToStores from '../listenToStores.jsx';
import AnimatedList from '../animatedList.jsx';
import Expression from './expression.jsx';

const verticalPadding = 10;
const springConfig = [300, 50];


// import StyleSheet from 'react-style';
// const styles = StyleSheet.create({
//   foo: {
//     color: 'red',
//     backgroundColor: 'lime'
//   }
// });


const expressionHeaderHeight = 38;
const expressionFooterHeight = 26;


let AnimatedExpression = React.createClass({

  handleSelectExpression() {

  },
  handleSelectPreviousExpression() {

  },
  handleSelectNextExpression() {

  },

  render() {
    let {interpolated, datum} = this.props;
    let expression = datum.obj;
    let {scale, shadow, opacity, x, y, width, height} = interpolated;

    // // disable event handlers if item is "animating away"
    // let {handleClickRemove, handleClickGrow, handleClickShrink} = this;
    // if (datum.isEntering || datum.isLeaving) {
    //   handleClickRemove = handleClickGrow = handleClickShrink = () => null;
    // }

    // Set a higher z-order on the item that was last moved.
    let z;
    if (datum.isLeaving || datum.isEntering) {
      z = 0;
    } else if (datum.wasLastPressed) {
      z = 99999;
    } else {
      z = datum.index + 1;
    }

    let transform = `translate3d(${x.val}px, ${y.val}px, ${z}px)`;
    if (scale.val !== 1) {
      transform += `scale3d(${scale.val}, ${scale.val}, 1)`;
      // transform += `translate3d(0, ${20 * scale.val}px, 0)`;
    }

    let style = {
      width: width.val,
      height: height.val,
      background: `hsla(${ 360 }, 60%, 100%, 0.7)`,
      opacity: opacity.val,
      boxShadow: `rgba(0, 0, 0, 0.2) 0px ${shadow.val}px ${2 * shadow.val}px 0px`,
      transform: transform,
      WebkitTransform: transform,
      MozTransform: transform
    };



    return (
      <div
        key={datum.key}
        className="demo8-item"
        style={style}
      >

        <Expression
          scale={scale.val}
          key={expression.id}
          expression={expression}
          selection={this.props.selection}
          onSelectExpression={this.handleSelectExpression.bind(null, expression)}
          onSelectPreviousExpression={this.handleSelectPreviousExpression}
          onSelectNextExpression={this.handleSelectNextExpression}
        />

        <div className="item-handle"
          onMouseDown={this.props.onMouseDown}
          onTouchStart={this.props.onTouchStart}
        />


      </div>
    );
  }
});

import EditorStore from '../stores/editor.store';
AnimatedExpression = listenToStores(AnimatedExpression, [EditorStore], () => {
  return {
    selection: EditorStore.getSelection()
  };
});







let ExpressionList = React.createClass({

  handleEndValue(interpolated, datum, mouse) {
    let isBeingMoved = datum.isBeingMoved;
    interpolated.scale = {val: 1.0, config: springConfig};
    interpolated.shadow = {val: isBeingMoved? 16.0 : 1.0, config: springConfig};
    interpolated.opacity = {val: 1, config: springConfig};
    interpolated.x = {val: 0, config: springConfig};
    interpolated.y = {val: isBeingMoved? mouse : datum.y.start, config: isBeingMoved? [] : springConfig};
    interpolated.width = {val: 320, config: springConfig};

    // Expand rectangle horizontally without scaling (since Ace Editor can't be scaled using transforms)
    if (isBeingMoved) {
      interpolated.width.val = 360;
      interpolated.x.val = -20;
    }
  },

  handleEnter(interpolated, datum) {
    interpolated.isEntering = {val: 1};
    interpolated.scale = {val: 0.2, config: springConfig};
    interpolated.shadow = {val: 1, config: springConfig};
    interpolated.opacity = {val: 0, config: springConfig};
    interpolated.x = {val: 0, config: springConfig};
    interpolated.y = {val: datum.y.start, config: springConfig};
    interpolated.width = {val: 320, config: springConfig};
    return interpolated;
  },

  handleLeave(interpolated, datum) {
    return {
      isEntering: interpolated.isEntering,
      isLeaving: {val: 1},
      scale: {val: 0.4, config: springConfig},
      shadow: {val: 1, config: springConfig},
      opacity: {val: 0, config: springConfig},
      x: {val: 0, config: springConfig},
      y: {val: interpolated.y.val, config: springConfig},
      width: interpolated.width,
      height: interpolated.height
    };
  },

  getExpressionHeight(expression) {
    // Header is 38px, Footer is 26px, Body font size is 16px

    // TODO: use Ace editor height when available!
    // editor.getSession().getDocument().getLength() *
    // editor.renderer.lineHeight + editor.renderer.scrollBar.getWidth()

    if (expression.isSystemExpression || expression.isHtmlExpression) {
      return expressionHeaderHeight + 200;
    } else {
      let lines = expression.body.split(/\r\n|\r|\n/).length;
      let bodyHeight = (lines * 15.454545021057129); //font sizae is 16 but do 22
      return expressionHeaderHeight + bodyHeight + expressionFooterHeight;
    }
  },

  render() {
    return (
      <div style={{
        height: '800px'
      }}>
        <AnimatedList
          data={this.props.expressions}
          AnimationItem={AnimatedExpression}
          getHeight={this.getExpressionHeight}

          onReOrdered={this.handleReordered}

          onEndValue={this.handleEndValue}
          onWillLeave={this.handleLeave}
          onWillEnter={this.handleEnter}

        />
      </div>
    );
  }

});

export default ExpressionList;