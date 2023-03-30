const BLOCKS = {
  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  J: [
    [2, 0, 0],
    [2, 2, 2],
    [0, 0, 0],
  ],
  L: [
    [0, 0, 3],
    [3, 3, 3],
    [0, 0, 0],
  ],
  O: [
    [4, 4],
    [4, 4],
  ],
  S: [
    [0, 5, 5],
    [5, 5, 0],
    [0, 0, 0],
  ],
  T: [
    [0, 6, 0],
    [6, 6, 6],
    [0, 0, 0],
  ],
  Z: [
    [7, 7, 0],
    [0, 7, 7],
    [0, 0, 0],
  ],
};

const BLOCK_CLASSES = {
  0: 'empty',
  1: 'I',
  2: 'J',
  3: 'L',
  4: 'O',
  5: 'S',
  6: 'T',
  7: 'Z',
  10: 'I freeze',
  20: 'J freeze',
  30: 'L freeze',
  40: 'O freeze',
  50: 'S freeze',
  60: 'T freeze',
  70: 'Z freeze',
};

const SCORES = {
  1: 100,
  2: 300,
  3: 500,
  4: 800,
};

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

export { BLOCKS, BOARD_HEIGHT, BOARD_WIDTH, BLOCK_CLASSES, SCORES };
