const getInitialBoard = (width, height) => {
  return Array(height)
    .fill(0)
    .map(() => Array(width).fill(0));
};

const getInitialBlockPos = (width, block) => {
  return {
    x: Math.floor((width - block[0].length) / 2),
    y: 0,
  };
};

const getBlock = (blocks) => {
  return Object.values(blocks)[Math.floor(Math.random() * 7)];
};

const rotateBlock = (block) => {
  return block[0].map((_, i) => block.map((row) => row[i]).reverse());
};

export { getInitialBoard, getInitialBlockPos, getBlock, rotateBlock };
