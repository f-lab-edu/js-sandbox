import WebComponent from "../core/WebComponent";
import { css, html } from "../utils/utils";

class Tetris extends WebComponent {
  shadowHTML() {
    return html`
      <h1>Tetris</h1>
      <p>You are viewing the Tetris component!</p>
    `;
  }

  shadowStyle() {
    return css`
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }
    `;
  }
}

export default Tetris;
