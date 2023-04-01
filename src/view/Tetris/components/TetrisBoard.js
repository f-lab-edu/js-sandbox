import WebComponent from '../../../core/WebComponent';
import { BLOCK_CLASSES, BOARD_HEIGHT, BOARD_WIDTH, SCORES } from '../const';
import { html } from '../../../utils/utils';
import Tetromino, { CREATE_NEW_BLOCK, FREEZE } from '../class/Tetromino';
import { getInitialData } from '../utils';

export default class TetrisBoard extends WebComponent {
  constructor() {
    super();
    this.data = getInitialData(BOARD_WIDTH, BOARD_HEIGHT);
    this.$tetris = null;
    this.start = false;
    this.tetromino = null;
    this.lastTime = null;
    this.dropInterval = 1000;
    this.tetrominoCounter = 0;
    this.animationId = null;
    this.bindMethods('startGame', 'keydownHandler', 'dropBlock', 'increaseDropSpeed', 'removeFullRows');
  }

  connectedCallback() {
    super.connectedCallback();
    Tetromino.subscribe(CREATE_NEW_BLOCK, this.increaseDropSpeed);
    Tetromino.subscribe(FREEZE, this.removeFullRows);
  }

  disconnectedCallback() {
    Tetromino.unsubscribe(CREATE_NEW_BLOCK, this.increaseDropSpeed);
    Tetromino.unsubscribe(FREEZE, this.removeFullRows);
  }

  injectHTML() {
    return html`
      ${this.data
        .map(
          (row) => html`
            <ul>
              ${row.map((cell) => html`<li class="cell-${BLOCK_CLASSES[cell]}"></li>`).join('')}
            </ul>
          `
        )
        .join('')}
    `;
  }

  increaseDropSpeed() {
    if (this.tetrominoCounter === 10) {
      this.tetrominoCounter = 0;
      this.dropInterval *= 0.9;
    }
    this.tetrominoCounter += 1;
  }

  startGame($tetris) {
    if (this.start) return;
    this.data = getInitialData(BOARD_WIDTH, BOARD_HEIGHT);
    this.$tetris = $tetris;
    this.start = true;
    this.tetromino = new Tetromino(this);
    this.updateBoard();
    document.addEventListener('keydown', this.keydownHandler);
    this.lastTime = performance.now();
    requestAnimationFrame(this.dropBlock);
  }

  stopGame() {
    this.start = false;
    this.tetrominoCounter = 0;
    this.dropInterval = 1000;
    document.removeEventListener('keydown', this.keydownHandler);
  }

  dropBlock(timestamp) {
    const deltaTime = timestamp - this.lastTime;

    if (deltaTime > this.dropInterval) {
      const prevTetromino = this.tetromino.clone();
      this.tetromino.moveDown();
      this.updateBoard(prevTetromino);
      this.lastTime = timestamp;
    }

    if (this.start) {
      this.animationId = requestAnimationFrame(this.dropBlock);
    } else {
      cancelAnimationFrame(this.animationId);
    }
  }

  keydownHandler(e) {
    const prevTetromino = this.tetromino.clone();

    if (e.key === 'ArrowDown') {
      this.tetromino.moveDown();
    } else if (e.key === 'ArrowUp') {
      this.tetromino.rotate();
    } else if (e.key === 'ArrowLeft') {
      this.tetromino.moveLeft();
    } else if (e.key === 'ArrowRight') {
      this.tetromino.moveRight();
    }

    this.updateBoard(prevTetromino);
  }

  updateBoard(prevTetromino = null) {
    if (prevTetromino) {
      this.removeOldBlock(prevTetromino);
    }

    this.putNewBlock(this.data);
    this.render();
  }

  removeOldBlock(tetromino) {
    const { block, x, y } = tetromino;

    block.forEach((row, i) => {
      row.forEach((col, j) => {
        if (this.data[y + i]?.[x + j] === col) {
          // eslint-disable-next-line no-param-reassign
          this.data[y + i][x + j] = 0;
        }
      });
    });
  }

  putNewBlock() {
    const { x, y, block } = this.tetromino;

    block.forEach((row, i) => {
      row.forEach((col, j) => {
        if (col !== 0) {
          // eslint-disable-next-line no-param-reassign
          this.data[y + i][x + j] = col;
        }
      });
    });
  }

  removeFullRows() {
    console.log('removeFullRows');
    let result = 0;
    this.data.forEach((row, i) => {
      if (row.every((cell) => cell >= 10)) {
        result += 1;
        this.data.splice(i, 1);
        this.data.unshift(Array(BOARD_WIDTH).fill(0));
      }
    });

    if (result > 0) {
      this.$tetris.scoreUp(SCORES[result]);
    }
  }
}
