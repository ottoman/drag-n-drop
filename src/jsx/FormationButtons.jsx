import React from 'react';
import classNames from 'classnames';
import ButtonGroup from './ButtonGroup.jsx';


let FormationButtons = React.createClass({

  render() {
    let {activeFormation} = this.props;
    let formations = ['4 4 2', '4 3 3', '5 3 2', '5 4 1']
    let buttons = formations.map(formation => (
        <button
          key={formation}
          className={classNames({
            'glass': true,
            'glass-toggleable': true,
            'glass-toggleable--is-toggled': formation === this.props.selectedFormation
          })}
          onClick={this.props.onClickFormation.bind(this, formation)}
        >
        {formation.replace(/ /g, '-')}
        </button>
    ));
    return (
      <ButtonGroup>
        {buttons}
      </ButtonGroup>
    );
  }

});


export default FormationButtons;