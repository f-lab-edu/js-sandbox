import { BLOCKS, BOARD_HEIGHT, BOARD_WIDTH, SCORES } from '../const';

export default class Tetromino {
  constructor() {
    this.block = Object.values(BLOCKS)[Math.floor(Math.random() * 7)];
    const initialBlockPos = this.getInitialBlockPos(BOARD_WIDTH, this.block);
    this.x = initialBlockPos.x;
    this.y = initialBlockPos.y;
  }

  rotate(board) {
    const rotatedBlock = this.block[0].map((_, i) => this.block.map((row) => row[i]).reverse());
    const rotatedWidth = rotatedBlock[0].length;
    const rotatedHeight = rotatedBlock.length;
    let newX = this.x;
    let newY = this.y;

    if (newX + rotatedWidth > BOARD_WIDTH) {
      newX = BOARD_WIDTH - rotatedWidth;
    }
    if (newX < 0) {
      newX = 0;
    }
    if (newY + rotatedHeight > BOARD_HEIGHT) {
      newY = BOARD_HEIGHT - rotatedHeight;
    }
    if (newY < 0) {
      newY = 0;
    }

    if (this.canMove(board, newX, newY, rotatedBlock)) {
      this.block = rotatedBlock;
      this.x = newX;
      this.y = newY;
    }
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
    } else {
      this.freeze(board);
    }
  }

  freeze(board) {
    const { block, x, y } = this;
    block.forEach((row, i) => {
      row.forEach((col, j) => {
        if (col !== 0) {
          board[y + i][x + j] = col * 10;
        }
      });
    });

    const clearedRows = this.removeFullRows(board);
    document.querySelector('my-tetris').score += SCORES[clearedRows] ?? 0;

    this.block = Object.values(BLOCKS)[Math.floor(Math.random() * 7)];
    const initialBlockPos = this.getInitialBlockPos(BOARD_WIDTH, this.block);
    this.x = initialBlockPos.x;
    this.y = initialBlockPos.y;
  }

  removeFullRows(board) {
    let clearedRows = 0;
    board.forEach((row, i) => {
      if (row.every((cell) => cell >= 10)) {
        clearedRows += 1;
        board.splice(i, 1);
        board.unshift(Array(BOARD_WIDTH).fill(0));
      }
    });
    return clearedRows;
  }

  canMove(board, x, y, block) {
    for (let row = 0; row < block.length; row += 1) {
      for (let col = 0; col < block[row].length; col += 1) {
        if (block[row][col] !== 0) {
          const nextX = x + col;
          const nextY = y + row;
          if (nextX < 0 || nextX >= BOARD_WIDTH || nextY < 0 || nextY >= BOARD_HEIGHT || board[nextY][nextX] >= 10) {
            return false;
          }
        }
      }
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
