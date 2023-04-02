import WebComponent from '../../core/WebComponent';
import { html } from '../../utils/utils';
import './styles.scss';
import { BLOCKS, BOARD_HEIGHT, BOARD_WIDTH } from './const';
import { getBlock, getInitialBlockPos, getInitialBoard, rotateBlock } from './utils';

export default class Tetris extends WebComponent {
  constructor() {
    super();
    this.board = getInitialBoard(BOARD_WIDTH, BOARD_HEIGHT);
    this.start = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this.querySelector('#start-button').addEventListener('click', this.startGame.bind(this));
  }

  injectHTML() {
    return html`
      <button id="start-button">게임 시작</button>
      <div class="board">
        ${this.board
          .map(
            (row, i) => html`
              <ul>
                ${row.map((col, j) => html`<li class="cell-${this.board[i][j]}"></li>`).join('')}
              </ul>
            `
          )
          .join('')}
      </div>
      <div>추후 추가될 공간입니다.</div>
    `;
  }

  static get observedAttributes() {
    return ['board', 'block', 'block-pos'];
  }

  attributeChangedCallback(name, oldV, newV) {
    const oldValue = JSON.parse(oldV);
    const newValue = JSON.parse(newV);
    const newBoard = this.board;
    if (name === 'block-pos') {
      if (oldValue) {
        this.removeOldBlock(this.block, oldValue, newBoard);
      }
      this.putNewBlock(this.block, newValue, newBoard);
      this.board = newBoard;
    } else if (name === 'block' && this.blockPos) {
      this.removeOldBlock(oldValue, this.blockPos, newBoard);
      this.putNewBlock(newValue, this.blockPos, newBoard);
      this.board = newBoard;
    } else if (name === 'board') {
      this.render();
    }
  }

  removeOldBlock(block, position, newBoard) {
    block.forEach((row, i) => {
      row.forEach((col, j) => {
        if (col === 1) {
          // eslint-disable-next-line no-param-reassign
          newBoard[position.y + i][position.x + j] = 0;
        }
      });
    });
  }

  putNewBlock(block, position, newBoard) {
    block.forEach((row, i) => {
      row.forEach((col, j) => {
        // eslint-disable-next-line no-param-reassign
        newBoard[position.y + i][position.x + j] = col;
      });
    });
  }

  startGame() {
    if (this.start) return;
    this.start = true;
    this.block = getBlock(BLOCKS);
    this.blockPos = getInitialBlockPos(BOARD_WIDTH, this.block);
    document.addEventListener('keydown', this.keydownHandler.bind(this));
  }

  keydownHandler(e) {
    if (e.key === 'ArrowDown') {
      this.blockPos = { x: this.blockPos.x, y: this.blockPos.y + 1 };
    } else if (e.key === 'ArrowUp') {
      this.block = rotateBlock(this.block);
    } else if (e.key === 'ArrowLeft') {
      this.blockPos = { x: this.blockPos.x - 1, y: this.blockPos.y };
    } else if (e.key === 'ArrowRight') {
      this.blockPos = { x: this.blockPos.x + 1, y: this.blockPos.y };
    }
  }

  get board() {
    return JSON.parse(this.getAttribute('board'));
  }

  set board(value) {
    this.setAttribute('board', JSON.stringify(value));
  }

  get block() {
    return JSON.parse(this.getAttribute('block'));
  }

  set block(value) {
    this.setAttribute('block', JSON.stringify(value));
  }

  get blockPos() {
    return JSON.parse(this.getAttribute('block-pos'));
  }

  set blockPos(value) {
    this.setAttribute('block-pos', JSON.stringify(value));
  }
}
