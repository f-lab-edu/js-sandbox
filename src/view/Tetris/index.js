import WebComponent from '../../core/WebComponent';
import { html } from '../../utils/utils';
import './styles.scss';
import { BOARD_HEIGHT, BOARD_WIDTH } from './const';
import Tetromino from './class/Tetromino';

export default class Tetris extends WebComponent {
  constructor() {
    super();
    this.board = this.getInitialBoard(BOARD_WIDTH, BOARD_HEIGHT);
    this.start = false;
    this.tetromino = null;
    this.startGame = this.startGame.bind(this);
    this.keydownHandler = this.keydownHandler.bind(this);
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
                ${row.map((col) => html`<li class="cell-${col}"></li>`).join('')}
              </ul>
            `
          )
          .join('')}
      </div>
      <div>추후 추가될 공간입니다.</div>
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
    this.tetromino = new Tetromino();
    this.updateBoard();
    document.addEventListener('keydown', this.keydownHandler);
  }

  keydownHandler(e) {
    const prevTetromino = this.tetromino.clone();

    if (e.key === 'ArrowDown') {
      this.tetromino.moveDown(this.board);
    } else if (e.key === 'ArrowUp') {
      this.tetromino.rotate();
    } else if (e.key === 'ArrowLeft') {
      this.tetromino.moveLeft(this.board);
    } else if (e.key === 'ArrowRight') {
      this.tetromino.moveRight(this.board);
    }

    this.updateBoard(prevTetromino);
  }

  updateBoard(prevTetromino = null) {
    const newBoard = this.board;
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
        if (col === 1) {
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
        if (col === 1) {
          // eslint-disable-next-line no-param-reassign
          newBoard[y + i][x + j] = 1;
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
