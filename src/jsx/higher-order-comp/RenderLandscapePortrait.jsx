import React from 'react';

const getDimensions = () => {
  return {
    width: window.innerWidth || document.body.clientWidth,
    height: window.innerHeight || document.body.clientHeight
  };
};

function RenderLandscapePortrait(component) {
  return class extends component {

    constructor(props) {
      super(props);
      this.handleOrientationChange = this.handleOrientationChange.bind(this);
      let dimensions = getDimensions();
      this.state = {isLandscape: dimensions.width > dimensions.height };
    }

    componentDidMount() {
      window.addEventListener('orientationchange', this.handleOrientationChange);
    }

    componentWillUnmount() {
      window.removeEventListener('orientationchange', this.handleOrientationChange);
    }

    handleOrientationChange() {
      let dimensions = getDimensions();
      let isLandscape = dimensions.width > dimensions.height;
      if (this.state.isLandscape !== isLandscape) {
        this.setState({isLandscape: isLandscape});
      }
    }

    render() {
      let {width, height} = getDimensions();
      if (this.state.isLandscape) {
        return super.renderLandscape(width, height);
      } else {
        return super.renderPortrait(width, height);
      }
    }
  }
}

export default RenderLandscapePortrait;