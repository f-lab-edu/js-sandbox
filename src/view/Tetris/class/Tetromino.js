import { BLOCKS, BOARD_HEIGHT, BOARD_WIDTH } from '../const';

export default class Tetromino {
  constructor() {
    const block = Object.values(BLOCKS)[Math.floor(Math.random() * 7)];
    const initialBlockPos = this.getInitialBlockPos(BOARD_WIDTH, block);

    this.block = block;
    this.x = initialBlockPos.x;
    this.y = initialBlockPos.y;
  }

  rotate() {
    this.block = this.block[0].map((_, i) => this.block.map((row) => row[i]).reverse());
  }

  moveLeft(board) {
    if (this.canMove(board, this.x - 1, this.y, this.block)) {
      this.x -= 1;
    }
  }

  moveRight(board) {
    if (this.canMove(board, this.x + 1, this.y, this.block)) {
      this.x += 1;
    }
  }

  moveDown(board) {
    if (this.canMove(board, this.x, this.y + 1, this.block)) {
      this.y += 1;
    }
  }

  canMove(board, x, y, block) {
    for (let row = 0; row < block.length; row += 1) {
      for (let col = 0; col < block[row].length; col += 1) {
        if (block[row][col] !== 0) {
          const nextX = x + col;
          const nextY = y + row;
          if (nextX < 0 || nextX >= BOARD_WIDTH || nextY < 0 || nextY >= BOARD_HEIGHT) {
            return false;
          }
        }
      }
    }
    const blockHeight = block.reduce((acc, row) => acc + row.some((cell) => cell !== 0), 0);
    const bottomMostRowY = y + blockHeight - 1;
    if (bottomMostRowY >= BOARD_HEIGHT) {
      return false;
    }

    return true;
  }

  getInitialBlockPos(width, block) {
    const firstNonEmptyRowIndex = block.findIndex((row) => row.some((cell) => cell !== 0));

    return {
      x: Math.floor((width - block[0].length) / 2),
      y: -firstNonEmptyRowIndex,
    };
  }

  clone() {
    const cloned = new Tetromino();
    cloned.block = this.block.map((row) => [...row]);
    cloned.x = this.x;
    cloned.y = this.y;
    return cloned;
  }
}
