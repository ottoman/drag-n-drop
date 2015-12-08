import React from 'react';
import _ from 'lodash';
import AnimatePlayerIcons from './AnimatePlayerIcons.jsx';
import FormationButtons from './FormationButtons.jsx';
import formationCoordinates from './formationCoordinates.js';
import SvgUniform from './svg-uniform/main.coffee';
import FormationMarker from './FormationMarker.jsx';
import RenderLandscapePortrait from './higher-order-comp/RenderLandscapePortrait';


class Editor extends React.Component {

  constructor(props) {
    super(props);
  }

  getFormationCoordinates(field, coordinates) {
    let x = field.height - (field.width);
    let paddedWidth = field.width - (field.padding * 2);
    let paddedHeight = field.height - (field.padding * 2);
    let result = coordinates
      .concat([])
      // 5 subs in a vertical column to the right
      .concat(formationCoordinates.col(-0.28, _.range(0.18, 0.84, 0.16)))
      // 13 reserve positions even further right
      .concat(formationCoordinates.col(-0.5, _.range(1, 0, -0.08)))
      .map((p) => {
        return {
          x: p.x * paddedWidth + x  + field.padding + field.margin,
          y: (p.y * paddedHeight) + field.padding + field.margin
        };
      });
    return result;
  }

  handleClickFormation(formation) {
    this.props.onFormationChanged(formation);
  }

  handlePositionsChanged(newPositions) {
    this.props.onPositionsChanged(newPositions);
  }

  handleClickNewUniform(event) {
    event.preventDefault();
    this.props.onNewUniform();
  }

  handleClickClear() {
    this.props.onClearPositions();
  }

  getField(height) {
    let field = {};
    field.margin = 20;
    let adjustedHeight = height - (field.margin * 2);
    field.width = adjustedHeight / 1.4;
    field.height = adjustedHeight;
    field.iconSize = (field.height) * 0.128;
    field.padding = field.height * 0.071;
    return field;
  }

  renderFormationEditor(field) {
    let {coordinates, playerPositions, playerMap} = this.props;
    // create array with x, y position of each formation position
    let formationMarkers = this.getFormationCoordinates(field, coordinates).map((p, i) => {
      let size = i > 15? field.iconSize * 0.5 : field.iconSize;
      return <FormationMarker key={i} size={size} x={p.x} y={p.y}  />  
    }) 
    return (
      <div>
        <div className="field" style={{
          position: 'absolute',
          top: field.margin,
          left: field.margin + field.height - (field.width),
          width: field.width,
          height: field.height
        }}>
        </div>

        {formationMarkers}

        <AnimatePlayerIcons iconSize={field.iconSize}
          onChange={this.handlePositionsChanged.bind(this)}
          coordinates={this.getFormationCoordinates(field, coordinates)}
          playerPositions={playerPositions}
          playerMap={playerMap}
        />

        {/*
        <button 
          className="glass glass-red"
          style={{
            position: 'absolute',
            width: field.iconSize,
            height: 60,
            left: '13%',
            top: '90%'
          }}
          onClick={this.handleClickClear.bind(this)}
        >Clear</button>
        */}
      </div>
    );
  }

  renderFormationButtons(isLandscape) {
    let {formation} = this.props;
    return (
      <div style={{
        float: 'left',
        width: isLandscape? '100%' : '50%',
        height: isLandscape? '50%' : '100%',
        overflow: 'auto',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <FormationButtons
          onClickFormation={this.handleClickFormation.bind(this)}
          selectedFormation={formation}
        />
      </div>
    );
  }

  renderUniform(isLandscape) {
    let {uniform} = this.props;
    return (
      <div style={{
        width: isLandscape? '100%': '50%',
        height: isLandscape? '50%' : '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: isLandscape? 'column' : 'row',
        alignItems: 'center'
      }}>
        <SvgUniform uniform={uniform} />
        <button className="glass" style={{margin: 20}} onClick={this.handleClickNewUniform.bind(this)}>Random</button>
      </div>
    );
  }

  renderLandscape(width, height) {
    let field = this.getField(height);
    return (
      <div style={{
        height: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <div style={{
          position: 'relative',
          width: height,
          height: height
        }}>
          {this.renderFormationEditor(field)}
        </div>
        <div style={{
          position: 'relative',
          minWidth: height * 0.33,
          height: '100%'
        }}>
          {this.renderFormationButtons(true)}
          {this.renderUniform(true)}
        </div>
      </div>
    );
  }

  renderPortrait(width, height) {
    let field = this.getField(width);
    return (
      <div style={{
        height: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <div style={{
          position: 'relative',
          width: width,
          height: width
        }}>
          {this.renderFormationEditor(field)}
        </div>
        <div style={{
          display: 'flex',
          width: '100%',
          height: height - width
        }}>
          {this.renderFormationButtons(false)}
          {this.renderUniform(false)}
        </div>
      </div>
    );
  }

}

Editor = RenderLandscapePortrait(Editor);
export default Editor;