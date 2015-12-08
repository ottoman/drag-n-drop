import React from 'react';
import Player from '../modules/player.coffee';
import Uniform from '../modules/uniform.coffee';
import formationCoordinates from './formationCoordinates.js';
import Editor from './Editor.jsx';


class App extends React.Component {

  constructor(props) {
    super(props);
    // create a squad of 23 players with a unique jersey number
    let players = _.range(16).map((i) =>  {
      return Player.createRandom(i+1);
    });
    this.state = {
      // 4-4-2, 5-3-2 etc
      formation: '4 4 2',
      // x,y coordinates of each position
      coordinates: formationCoordinates['4 4 2'],
      // PlayerPositions holds all available positions in this formation and which
      // player is currently assigned to which position.
      playerPositions: _.range(0, 29, 1).map((c, i) => players[i] ),
      // animation requires a hash so convert array into object map here...
      playerMap: _.indexBy(players, 'id'),
      // a random jersey and shorts
      uniform: Uniform.createRandom()
    };
  }
  
  componentWillReceiveProps() {
    this.forceUpdate();
  }

  handleFormationChanged(formation) {
    this.setState({
      formation: formation,
      coordinates: formationCoordinates[formation]
    });
  }

  handlePositionsChanged(newPositions) {
    this.setState({
      playerPositions: newPositions
    });
  }

  handleNewUniform() {
    this.setState({
      uniform: Uniform.createRandom()
    });
  }

  handleClearPositions() {
    this.setState({
      playerPositions: _.sortBy(this.state.playerPositions, (a, b) => a !== undefined )
    });
  }

  render() {
    return (
      <Editor 
        {...this.state}
        onFormationChanged={this.handleFormationChanged.bind(this)}
        onPositionsChanged={this.handlePositionsChanged.bind(this)}
        onNewUniform={this.handleNewUniform.bind(this)}
        onClearPositions={this.handleClearPositions.bind(this)}
      />
    );
  }

};

export default App;