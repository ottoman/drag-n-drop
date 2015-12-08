
require('./css/styles.css');

import fastclick from 'react-fastclick';
import React from 'react';
import App from './jsx/App.jsx';

// Device dimensinos
// ipad (1st and 2nd gen) & ipad mini:      1024 x 768        1.33
// retina ipad:                             2048 x 1536       1.33
// iphone 4, 4s                             960 x 640         1.5
// iphone 5                                 1136 x 640        1.775

const getWindow = () => {
  return {
    width: window.innerWidth || document.body.clientWidth,
    height: window.innerHeight || document.body.clientHeight
  };
};

const renderApp = () => {
  React.render(
    React.createElement(App, { } ),
    document.getElementById('container')
  );
};

function handleResize() {
  let {width, height} = getWindow();
  if (width && height) {
    // Once we have width and height we can render
    renderApp();
    // Hide the spinner
    document.getElementById('loader').className = 'hide';
    // remove these handlers since we only need them once.
    // onorientationchange will be used to handle tablet portrait/landscape changes.
    window.removeEventListener('resize', handleResize);
    window.removeEventListener('DOMContentLoaded', handleResize);
  }
}
window.addEventListener('resize', handleResize);
document.addEventListener('DOMContentLoaded', handleResize);
