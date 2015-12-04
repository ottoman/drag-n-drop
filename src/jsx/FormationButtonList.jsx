// 'use strict';

// import React from 'react';

// class FormationButton extends React.Component {
  
//   handleClick() {

//   }

//   render() {
//     let {datum} = this.props;
//     return (
//       <button key={datum.key} className="formation-btn" onClick={this.handleClick}>
//         {datum.key}
//       </button>
//     );
//   }
// }

// const springConfig = [300, 50];
// class FormationButtonList extends React.Component {

//   handleEndValue(interpolated, datum, mouse) {
//     let isBeingMoved = datum.isBeingMoved;
//     interpolated.scale = {val: isBeingMoved? 1.2 : 1.0, config: springConfig};
//     interpolated.shadow = {val: isBeingMoved? 16.0 : 1.0, config: springConfig};
//     interpolated.opacity = {val: 1, config: springConfig};
//     interpolated.x = {val: 0, config: springConfig};
//     interpolated.y = {val: isBeingMoved? mouse : datum.y.start, config: isBeingMoved? [] : springConfig};
//   }

//   handleEnter(interpolated, datum) {
//     interpolated.isEntering = {val: 1};
//     interpolated.scale = {val: 0.2, config: springConfig};
//     interpolated.shadow = {val: 1, config: springConfig};
//     interpolated.opacity = {val: 0, config: springConfig};
//     interpolated.x = {val: 0, config: springConfig};
//     interpolated.y = {val: datum.y.start, config: springConfig};
//     return interpolated;
//   }

//   handleLeave(interpolated, datum) {
//     return {
//       isEntering: interpolated.isEntering,
//       isLeaving: {val: 1},
//       scale: {val: 0.4, config: springConfig},
//       shadow: {val: 1, config: springConfig},
//       opacity: {val: 0, config: springConfig},
//       x: {val: 0, config: springConfig},
//       y: {val: interpolated.y.val, config: springConfig}
//     };
//   }

//   render() {
//     let formations = [{id: '4-4-2'}, {id: '3-5-2'}]
//     return (
//       <div>
//         {/* 
//         <AnimatedList
//           data={formations}
//           AnimationItem={FormationButton}

//           pass={{
//             key: 'id',
//             width: 100,
//             height: 50
//           }}

//           onEndValue={this.handleEndValue}
//           onWillLeave={this.handleLeave}
//           onWillEnter={this.handleEnter}
//         />
//         */}
//       </div>
//     );
//   }
// }

// export default FormationButtonList;