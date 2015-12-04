import React from 'react';
import _ from 'lodash';
import AnimatePlayerIcons from './AnimatePlayerIcons.jsx';
import FormationButtons from './FormationButtons.jsx';
import formationCoordinates from './formationCoordinates.js';
import SvgUniform from './svg-uniform/main.coffee';
import FormationMarker from './FormationMarker.jsx';

function renderLandscapeAndPortrait(component) {
  return class extends component {
    render() {
      return super.renderLandscape();
    }
  }
}

class TeamEditor extends React.Component {

  constructor(props) {
    super(props);
  }

  getActualCoordinates(field, coordinates) {
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
          x: p.x * paddedWidth + field.padding + x,
          y: (p.y * paddedHeight) + field.padding
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

  renderLandscape() {
    let {team} = this.props;

    let field = {};
    field.height = (this.props.settings.window.height);       // 700px
    field.width = field.height / 1.4;         // 500px
    field.padding = field.height * 0.071;     // 49.5px
    let iconSize = (field.height) * 0.128;

    let formationMarkers = this.getActualCoordinates(field, team.coordinates).map((p, i) => {
      let size = i > 15? iconSize * 0.5 : iconSize;
      return <FormationMarker key={i} size={size} x={p.x} y={p.y}  />  
    }) 

    return (
      <div style={{
        height: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <div style={{
          position: 'relative',
          width: this.props.settings.window.height,
          height: '100%'
        }}>
            <div className="editor">
                
                <div className="field" style={{
                  position: 'absolute',
                  left: field.height - (field.width),
                  width: field.width,
                  height: field.height
                }}>
                </div>

                {formationMarkers}

                <AnimatePlayerIcons iconSize={iconSize}
                  onChange={this.handlePositionsChanged.bind(this)}
                  coordinates={this.getActualCoordinates(field, team.coordinates)}
                  playerPositions={team.playerPositions}
                  playerMap={team.playerMap}
                />

                <button 
                  className="glass glass-red"
                  style={{
                    position: 'absolute',
                    width: iconSize,
                    height: 60,
                    left: '13%',
                    top: '90%'
                  }}
                  onClick={this.handleClickClear.bind(this)}
                >Clear</button>

            </div>

        </div>
        <div className="tile" style={{
          position: 'relative',
          minWidth: this.props.settings.window.height * 0.33,
          height: '100%'
        }}>

            <div style={{
              padding: 20,
              height: '50%',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',

            }}>
              <FormationButtons
                onClickFormation={this.handleClickFormation.bind(this)}
                selectedFormation={this.props.team.formation}
              />
            </div>


            <div style={{
              padding: 20,
              height: '50%',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <div className="uniform" style={{ height: '80%', flexGrow: 1}}>
                <SvgUniform uniform={team.uniform} />
              </div>
              <button className="glass" onClick={this.handleClickNewUniform.bind(this)}>Random</button>
            </div>

        </div>
      </div>
    );
  }

  renderPortrait() {
    return (
      <div>portrait</div>
    );
  }

}

TeamEditor = renderLandscapeAndPortrait(TeamEditor);
export default TeamEditor;