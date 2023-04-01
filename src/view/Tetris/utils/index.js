import { shuffle } from '../../../utils/utils';

const createShuffleBlockQueue = (blocks) => {
  return shuffle(Object.values(blocks));
};

const getInitialBlockPos = (width, block) => {
  const firstNonEmptyRowIndex = block.findIndex((row) => row.some((cell) => cell !== 0));

  return {
    x: Math.floor((width - block[0].length) / 2),
    y: -firstNonEmptyRowIndex,
  };
};

const getInitialData = (width, height) => {
  return Array.from(Array(height), () => Array(width).fill(0));
};

export { createShuffleBlockQueue, getInitialBlockPos, getInitialData };
