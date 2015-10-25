'use strict';

import React from 'react';
import listenToStores from './listenToStores.jsx';
import _ from 'lodash';

import Canvas from './canvas.jsx';

import ExpressionList from './expression/expressionList.jsx';


import EditorStore from './stores/editor.store';
import EditorActions from './stores/editor.actions';
import InputStore from './stores/input.store';
import InputActions from './stores/input.actions';

import {DropdownButton, MenuItem} from 'react-bootstrap';

import Demo from './demo';


let Editor = React.createClass({

  handleSelectExpression: function(expression) {
    if (expression !== this.props.selection.expression) {
      EditorActions.EXPRESSION_SELECT.fire({
        id: expression.id,
        setActiveFocus: ''
      });
    }
  },

  handleSelectPreviousExpression: function() {
    EditorActions.EXPRESSION_SELECT_PREVIOUS.fire();
  },

  handleSelectNextExpression: function() {
    EditorActions.EXPRESSION_SELECT_NEXT.fire();
  },

  // handleClickInput: function(input) {
  //   InputActions.INPUT_BEGIN_LOAD.fire({
  //     selectedInput: input
  //   });
  // },

  handleClickNewExpression: function() {
    EditorActions.EXPRESSION_NEW.fire({
      name: '',
      setActiveFocus: 'name'
    });
  },

  renderExpression: function(expression) {
    return (
      <Expression
        key={expression.id}
        expression={expression}
        selection={this.props.selection}
        onSelectExpression={this.handleSelectExpression.bind(null, expression)}
        onSelectPreviousExpression={this.handleSelectPreviousExpression}
        onSelectNextExpression={this.handleSelectNextExpression}
      />
    );
  },

  renderOpenExpressions: function(expression) {
    return this.props.openExpressions.map(this.renderExpression);
  },

  renderFocused: function(expression) {
    if (!expression) {
      return null;
    } else {
      return this.renderExpression(expression);
    }
  },

  getInitialState: function() {
    return { open: false };
  },

  render: function() {
    let msg;
    let {selection, focusedExpression} = this.props;

    if (selection.expression && selection.expression.hasError) {
      msg = selection.expression.errorMsg;
    }

    return (
      <main className="editor mdl-grid mdl-grid--no-spacing">

        <Demo />

        {/* Left Column */}
        <div className="mdl-cell mdl-cell--2-col-desktop mdl-cell--8-col-tablet mdl-cell--4-col-phone editor-column editor-column--project">
          <div>
            <i className="material-icons">more_horiz</i>
            <i className="material-icons">more_vert</i>
            <i className="material-icons">close</i>
            {/* Flat button */}
            <button className="mdl-button mdl-js-button mdl-button--primary">
              Button
            </button>
            {/* Icon button */}
            <button className="mdl-button mdl-js-button mdl-button--icon mdl-button--colored mdl-button--primary" style={{
              fontSize: 18
            }}>
              <i className="material-icons">add</i>
            </button>
            {/* mini fab button */}
            <button className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored mdl-js-ripple-effect">
              <i className="material-icons">add</i>
            </button>

            <button className="mdl-button mdl-js-button mdl-button--fab mdl-button--colored mdl-js-ripple-effect">
              <i className="material-icons">add</i>
            </button>

          </div>
        </div>
        {/* Expressions Column */}
        <div className="mdl-cell mdl-cell--4-col-desktop mdl-cell--8-col-tablet mdl-cell--4-col-phone editor-column editor-column--exp">

          <ExpressionList selection={{}} expressions={this.props.openExpressions} />

          {/*

          <div className="focus-container">
            {this.renderFocused(focusedExpression)}
          </div>

          <div>
            {this.renderOpenExpressions()}
          </div>

          <div>
            <button onClick={this.handleClickNewExpression} className="mdl-button mdl-js-button mdl-button--fab mdl-button--colored mdl-js-ripple-effect editor-column-add-exp">
              <i className="material-icons">add</i>
            </button>
          </div>


          */}

        </div>
        {/* Canvas Column */}
        <div className="mdl-cell mdl-cell--6-col-desktop mdl-cell--8-col-tablet mdl-cell--4-col-phone editor-column editor-column--canvas">
          <Canvas />
        </div>
      </main>
    );


      // <div className="container">

      //   <h1>Editor</h1>
      //   <h2>Input</h2>
      //   <DropdownButton title={this.props.selectedInput}>
      //     {this.props.inputs.map((input) => {
      //       return <MenuItem onSelect={this.handleClickInput.bind(null, input)} key={input}>{input}</MenuItem>
      //     })}
      //   </DropdownButton>

      //   {this.renderFocused(focusedExpression)}

      //   <div className="row">
      //     {this.renderNewExpression()}
      //   </div>
      //   <div className="row">
      //     <div className="col-md-6">
      //       <div className="msg">{msg}</div>
      //     </div>
      //     <div className="col-md-6">
      //       <Canvas />
      //     </div>
      //   </div>
      // </div>


  }
});



Editor = listenToStores(Editor, [EditorStore, InputStore], () => {
  return {
    focusedExpression: EditorStore.getFocused(),
    openExpressions: EditorStore.getOpenExpressions(),
    selectedInput: InputStore.getSelectedInput(),
    inputs: InputStore.getAvailableInputs(),
    selection: EditorStore.getSelection()
  };
});
module.exports = Editor;
