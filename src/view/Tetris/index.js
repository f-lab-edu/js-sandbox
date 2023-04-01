import WebComponent from '../../core/WebComponent';
import { html } from '../../utils/utils';
import './styles.scss';
import Tetromino from './class/Tetromino';

export default class Tetris extends WebComponent {
  constructor() {
    super();
    this.score = 0;
    this.handleStart = this.handleStart.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.querySelector('#start-button').addEventListener('click', this.handleStart);
  }

  injectHTML() {
    return html`
      <my-tetris-board class="board"></my-tetris-board>
      <my-tetris-preview class="tetromino-previews"></my-tetris-preview>
      <span class="score" id="tetris-score">${this.score}</span>
      <button id="start-button">게임 시작</button>
    `;
  }

  get nextTetrominos() {
    return Tetromino.getNextTetrominos();
  }

  scoreUp(score) {
    this.score += score;
    this.querySelector('#tetris-score').innerText = this.score;
  }

  handleStart() {
    this.querySelector('my-tetris-board').startGame(this);
  }
}
