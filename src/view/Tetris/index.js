import WebComponent from '../../core/WebComponent';
import { html } from '../../utils/utils';
import './styles.scss';
import { BLOCK_CLASSES, BOARD_HEIGHT, BOARD_WIDTH } from './const';
import Tetromino from './class/Tetromino';

export default class Tetris extends WebComponent {
  constructor() {
    super();
    this.board = this.getInitialBoard(BOARD_WIDTH, BOARD_HEIGHT);
    this.start = false;
    this.tetromino = null;
    this.score = 0;
    this.lastTime = null;
    this.dropInterval = 1000;
    this.tetrominoCounter = 0;
    this.animationId = null;
    this.startGame = this.startGame.bind(this);
    this.keydownHandler = this.keydownHandler.bind(this);
    this.dropBlock = this.dropBlock.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.querySelector('#start-button').addEventListener('click', this.startGame);
  }

  injectHTML() {
    return html`
      <button id="start-button">게임 시작</button>
      <div class="board">
        ${this.board
          .map(
            (row) => html`
              <ul>
                ${row.map((col) => html`<li class="cell-${BLOCK_CLASSES[col]}"></li>`).join('')}
              </ul>
            `
          )
          .join('')}
      </div>
      <span class="score">${this.score}</span>
    `;
  }

  static get observedAttributes() {
    return ['board'];
  }

  attributeChangedCallback(name) {
    if (name === 'board') {
      this.render();
    }
  }

  getInitialBoard(width, height) {
    return Array.from(Array(height), () => Array(width).fill(0));
  }

  startGame() {
    if (this.start) return;
    this.start = true;
    this.tetromino = new Tetromino(this);
    this.tetrominoCounter += 1;
    this.updateBoard();
    document.addEventListener('keydown', this.keydownHandler);

    this.lastTime = performance.now();
    requestAnimationFrame(this.dropBlock);
  }

  stopGame() {
    this.start = false;
    this.board = this.getInitialBoard(BOARD_WIDTH, BOARD_HEIGHT);
    this.tetrominoCounter = 0;
    this.dropInterval = 1000;
    cancelAnimationFrame(this.animationId);
    document.removeEventListener('keydown', this.keydownHandler);
  }

  dropBlock(timestamp) {
    const deltaTime = timestamp - this.lastTime;

    if (deltaTime > this.dropInterval) {
      const prevTetromino = this.tetromino.clone();
      const newBoard = this.board;
      this.tetromino.moveDown(newBoard);
      this.updateBoard(newBoard, prevTetromino);
      this.lastTime = timestamp;
    }

    if (this.start) {
      this.animationId = requestAnimationFrame(this.dropBlock);
    }
  }

  keydownHandler(e) {
    const prevTetromino = this.tetromino.clone();
    const newBoard = this.board;

    if (e.key === 'ArrowDown') {
      this.tetromino.moveDown(newBoard);
    } else if (e.key === 'ArrowUp') {
      this.tetromino.rotate(newBoard);
    } else if (e.key === 'ArrowLeft') {
      this.tetromino.moveLeft(newBoard);
    } else if (e.key === 'ArrowRight') {
      this.tetromino.moveRight(newBoard);
    }

    this.updateBoard(newBoard, prevTetromino);
  }

  updateBoard(newBoard = this.board, prevTetromino = null) {
    if (prevTetromino) {
      this.removeOldBlock(prevTetromino, newBoard);
    }

    this.putNewBlock(this.tetromino, newBoard);
    this.board = newBoard;
  }

  removeOldBlock(tetromino, newBoard) {
    const { block, x, y } = tetromino;

    block.forEach((row, i) => {
      row.forEach((col, j) => {
        if (newBoard[y + i]?.[x + j] === col) {
          // eslint-disable-next-line no-param-reassign
          newBoard[y + i][x + j] = 0;
        }
      });
    });
  }

  putNewBlock(tetromino, newBoard) {
    const { x, y, block } = tetromino;

    block.forEach((row, i) => {
      row.forEach((col, j) => {
        if (col !== 0) {
          // eslint-disable-next-line no-param-reassign
          newBoard[y + i][x + j] = col;
        }
      });
    });
  }

  get board() {
    return JSON.parse(this.getAttribute('board'));
  }

  set board(value) {
    this.setAttribute('board', JSON.stringify(value));
  }
}
