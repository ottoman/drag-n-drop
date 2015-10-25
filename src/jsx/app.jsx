'use strict';

import React from 'react';

import PlayerIcon from './player-icon/main.coffee';
import Player from '../modules/player/player.coffee';


const App = React.createClass({

  render: function() {
    return <div>
      <div>
        <header>
          <h1>Title</h1>
        </header>
        <div>

          <div style={{width: 200, height: 200}}>
            <PlayerIcon playerImage={Player.createRandom()} />
          </div>

        </div>
      </div>
    </div>;

  }

});

module.exports = App;
