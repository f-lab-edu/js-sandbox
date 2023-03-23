import WebComponent from '../../core/WebComponent';
import { html } from '../../utils/utils';

export default class Tetris extends WebComponent {
  getHTML() {
    return html`
      <h1>Tetris</h1>
      <p>You are viewing the Tetris component!</p>
    `;
  }
}
