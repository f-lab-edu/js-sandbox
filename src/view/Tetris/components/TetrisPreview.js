import { html } from '../../../utils/utils';
import { BLOCK_CLASSES } from '../const';
import WebComponent from '../../../core/WebComponent';
import Tetromino, { CREATE_NEW_BLOCK } from '../class/Tetromino';

export default class TetrisPreview extends WebComponent {
  connectedCallback() {
    super.connectedCallback();
    Tetromino.subscribe(CREATE_NEW_BLOCK, this.render);
  }

  disconnectedCallback() {
    Tetromino.unsubscribe(CREATE_NEW_BLOCK, this.render);
  }

  injectHTML() {
    return html`
      ${this.nextTetrominos
        .map(
          (tetromino) => html`
            <div class="tetromino-preview">
              ${tetromino
                .map(
                  (row) => html`
                    <ul class="tetromino-preview-row">
                      ${row.map((cell) => html` <li class="cell-${BLOCK_CLASSES[cell]}"></li> `).join('')}
                    </ul>
                  `
                )
                .join('')}
            </div>
          `
        )
        .join('')}
    `;
  }

  get nextTetrominos() {
    return Tetromino.getNextTetrominos();
  }
}
