'use strict';

import React from 'react';
import Player from '../modules/player.coffee';
import Uniform from '../modules/uniform.coffee';
import formationCoordinates from './formationCoordinates.js';
import TeamEditor from './TeamEditor.jsx';


// a Team is a list of players positioned in a specific formation
let Team = (players, coordinates, formation, uniform) => {
  return {
    // 4-4-2, 5-3-2 etc
    formation: formation,
    // x,y coordinates of each position including the subs and reserves.
    coordinates: coordinates,
    // PlayerPositions holds all available positions in this formation and which
    // player is currently assigned to which position.
    playerPositions: _.range(0, 29, 1).map((c, i) => players[i] ),
    // animation requires a hash so convert array into object map here...
    playerMap: _.indexBy(players, 'id'),
    uniform: uniform
  }
}


class App extends React.Component {

  // static settings = settings

  constructor(props) {
    super(props);
    // create a squad of 23 players with a unique jersey number
    let players = _.range(16).map((i) =>  {
      return Player.createRandom(i+1);
    });
    // create a couple of preset teams
    let teams = [
      new Team(_.shuffle(players), formationCoordinates['4 4 2'], '4 4 2', Uniform.createRandom()),
      new Team(_.shuffle(players), formationCoordinates['5 3 2'], '5 3 2', Uniform.createRandom())
    ];
    this.state = {
      teams: teams,
      selectedTeam: teams[0]
    };
  }
  
  componentWillReceiveProps() {
    this.forceUpdate();
  }

  handleFormationChanged(formation) {
    let {selectedTeam} = this.state;
    selectedTeam.formation = formation;
    selectedTeam.coordinates =  formationCoordinates[formation];
    this.setState({
      selectedTeam: selectedTeam
    });
  }

  handlePositionsChanged(newPositions) {
    let {selectedTeam} = this.state;
    selectedTeam.playerPositions = newPositions;
    this.setState({
      selectedTeam: selectedTeam
    });
  }

  handleNewUniform() {
    let {selectedTeam} = this.state;
    selectedTeam.uniform = Uniform.createRandom();
    this.setState({
      selectedTeam: selectedTeam
    });
  }

  handleClearPositions() {
    let {selectedTeam} = this.state;
    selectedTeam.playerPositions = _.sortBy(selectedTeam.playerPositions, (a, b) => a !== undefined )
    this.setState({
      selectedTeam: selectedTeam
    });
  }

  render() {
    let {field, iconSize} = this.props.settings;
    let {selectedTeam} = this.state;
    return (
      <TeamEditor 
        team={selectedTeam}
        settings={this.props.settings}
        onFormationChanged={this.handleFormationChanged.bind(this)}
        onPositionsChanged={this.handlePositionsChanged.bind(this)}
        onNewUniform={this.handleNewUniform.bind(this)}
        onClearPositions={this.handleClearPositions.bind(this)}
      />
    );
    return (
      {/*
      <ReactCSSTransitionGroup transitionName="fadein" transitionAppear={true} transitionEnter={false} transitionLeave={false}>
        <div key="wrapper" className="wrapper fadein">
          
          <header>
            <h1>Manage Team</h1>
          </header>
          
          <div className="content">

          </div>
        </div>
      </ReactCSSTransitionGroup>
      */} 
    );
  }

};

export default App;