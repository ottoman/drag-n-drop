// 'use strict';

// import React from 'react';
// import FormationMarker from './FormationMarker.jsx';
// import AnimatePosition from './AnimatePosition.jsx';

// let AnimateFormationMarkers = React.createClass({

//   statics: {spring: [300, 50]},

//   render() {
//     let coordinates = this.props.coordinates;
//     return (
//         <AnimatePosition
//           data={coordinates}
//           onEndValue={(interpolated, datum) => {
//             interpolated.x = {val: coordinates[datum.key].x, config: AnimateFormationMarkers.spring};
//             interpolated.y = {val: coordinates[datum.key].y, config: AnimateFormationMarkers.spring};
//           }}
//         >
//           {/* This Component will be rendered for each data item */}
//           <FormationMarker size={this.props.iconSize} />
//         </AnimatePosition>
//     );
//   }

// });

// export default AnimateFormationMarkers;