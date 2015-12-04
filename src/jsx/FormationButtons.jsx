'use strict';

import React from 'react';
import classNames from 'classnames';
import ButtonGroup from './ButtonGroup.jsx';
// import AnimatePosition from './AnimatePosition.jsx';

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



// let FormationButton = React.createClass({

//   render() {
//     let {x, y, scale, datum, isPressed} = this.props;
//     return (
//       <button
//         disabled={isPressed(datum.obj)}
//         className={classNames({
//           'glass': true,
//           'glass-toggleable': true,
//           'glass-toggleable--is-toggled': isPressed(datum.obj)
//         })}
//         style={{
//           position: 'absolute',
//           'transform': `translate3D(0, ${y}px, 0) scale(${scale})`,
//           'WebkitTransform': `translate3D(0, ${y}px, 0) scale(${scale})`
//         }}
//         onClick={this.props.onClick.bind(null, datum.obj)}
//       >
//         {datum.obj}
//       </button>
//     );
//   }

// });

// let AnimateFormationButtons = React.createClass({

//   statics: {spring: [300, 50]},

//   render() {
//     let {activeFormation} = this.props;
//     let formations = ['4 4 2', '4 3 3', '5 3 2', '5 4 1']
//     return (
//         <div style={this.props.style}>
//           <AnimatePosition
//             className="btn-group"
//             data={formations}
//             onEndValue={(interpolated, datum) => {
//               let isSelected = datum.obj === activeFormation;
//               interpolated.scale = {val: isSelected? 1.0 : 1.0, config: AnimateFormationButtons.spring};
//               let activeIndex = formations.indexOf(activeFormation);
//               // let isBeforeSelected = datum.key
//               let y = datum.key * 60;
//               interpolated.y = {val: y, config: AnimateFormationButtons.spring};
//             }}
//           >
//             {/* This Component will be rendered for each data item */}
//             <FormationButton isPressed={obj => obj === activeFormation } onClick={this.props.onClick}/>
//           </AnimatePosition>
//         </div>
//     );
//   }

// });

export default FormationButtons;