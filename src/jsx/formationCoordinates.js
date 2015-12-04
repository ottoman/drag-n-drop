import _ from 'lodash';

let position = (x, y) => {
  return {x: x, y: y};
}

// helper function to create position objects from a x, [y] or [x], y arguments
let row = (xPositions, y) => xPositions.map(_.ary(_.partialRight(position, y), 1));
let col = (x, yPositions) => yPositions.map(_.ary(_.partial(position, x), 1));

let createCoordinates = (...formation) => {
  return _.flatten(
    formation
  , 2);
}

// Create arrays of x & y coordinates for each formation
// that can be selected. The formation is rendered with 
// a padding so the position of 0, 0 should render in the
// top left corner of the field but still keep the player
// icon within the field.

let formationCoordinates = {
  '4 4 2': createCoordinates([
    row([            0.50            ], 1.0),
    row([0.00,   0.33,   0.67,   1.00], 0.75),
    row([0.00,   0.33,   0.67,   1.00], 0.50),
    row([         0.25,   0.75       ], 0.25)
  ]),
  '4 3 3': createCoordinates([
    row([            0.50            ], 1.0),
    row([0.00,   0.33,   0.67,   1.00], 0.75),
    row([    0.16,   0.50,   0.84    ], 0.50),
    row([    0.16,   0.50,   0.84    ], 0.25)
  ]),
  '5 3 2': createCoordinates([
    row([            0.50            ], 1.0),
    row([0.00, 0.25, 0.50, 0.75, 1.00], 0.75),
    row([    0.16,   0.50,   0.84    ], 0.50),
    row([         0.25,   0.75       ], 0.25)
  ]),
  '5 4 1': createCoordinates([
    row([            0.50            ], 1.0),
    row([0.00, 0.25, 0.50, 0.75, 1.00], 0.75),
    row([0.00,   0.33,   0.67,   1.00], 0.50),
    row([            0.50            ], 0.25)
  ])
};

formationCoordinates.col = col;

export default formationCoordinates;