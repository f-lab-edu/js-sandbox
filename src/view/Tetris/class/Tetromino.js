import { BLOCKS, BOARD_HEIGHT, BOARD_WIDTH } from '../const';
import { createShuffleBlockQueue, getInitialBlockPos } from '../utils';

export const FREEZE = 'freeze';
export const CREATE_NEW_BLOCK = 'createNewBlock';

export default class Tetromino {
  static blockQueue = createShuffleBlockQueue(BLOCKS);

  static getNextTetrominos() {
    return Tetromino.blockQueue.slice(0, 5);
  }

  static observers = { [CREATE_NEW_BLOCK]: [], [FREEZE]: [] };

  static subscribe(event, observer) {
    Tetromino.observers[event].push(observer);
  }

  static notify(event) {
    Tetromino.observers[event].forEach((observer) => observer());
  }

  static unsubscribe(event, observer) {
    Tetromino.observers[event] = Tetromino.observers[event].filter((o) => o !== observer);
  }

  constructor($board, createBlock = true) {
    this.$board = $board;
    if (createBlock) {
      this.createNewBlock();
    }
  }

  createNewBlock() {
    this.block = Tetromino.blockQueue.shift();

    if (Tetromino.blockQueue.length < 5) {
      Tetromino.blockQueue = Tetromino.blockQueue.concat(createShuffleBlockQueue(BLOCKS));
    }

    const initialBlockPos = getInitialBlockPos(BOARD_WIDTH, this.block);
    this.x = initialBlockPos.x;
    this.y = initialBlockPos.y;

    Tetromino.notify(CREATE_NEW_BLOCK);
  }

  rotate() {
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

    if (this.canMove(newX, newY, rotatedBlock)) {
      this.block = rotatedBlock;
      this.x = newX;
      this.y = newY;
    }
  }

  moveLeft() {
    if (this.canMove(this.x - 1, this.y, this.block)) {
      this.x -= 1;
    }
  }

  moveRight() {
    if (this.canMove(this.x + 1, this.y, this.block)) {
      this.x += 1;
    }
  }

  moveDown() {
    if (this.canMove(this.x, this.y + 1, this.block)) {
      this.y += 1;
    } else if (this.y === 0) {
      this.freeze();
      this.$board.stopGame();
    } else {
      this.freeze();
      this.createNewBlock();
    }
  }

  freeze() {
    const { block, x, y } = this;
    block.forEach((row, i) => {
      row.forEach((col, j) => {
        if (col !== 0) {
          this.$board.data[y + i][x + j] = col * 10;
        }
      });
    });

    Tetromino.notify(FREEZE);
  }

  canMove(x, y, block) {
    for (let row = 0; row < block.length; row += 1) {
      for (let col = 0; col < block[row].length; col += 1) {
        if (block[row][col] !== 0) {
          const nextX = x + col;
          const nextY = y + row;
          if (
            nextX < 0 ||
            nextX >= BOARD_WIDTH ||
            nextY < 0 ||
            nextY >= BOARD_HEIGHT ||
            this.$board.data[nextY][nextX] >= 10
          ) {
            return false;
          }
        }
      }
    }

    return true;
  }

  clone() {
    const cloned = new Tetromino(this.$board, false);
    cloned.block = this.block.map((row) => [...row]);
    cloned.x = this.x;
    cloned.y = this.y;
    return cloned;
  }
}
