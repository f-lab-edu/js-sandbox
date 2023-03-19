import WebComponent from "../core/WebComponent";
import { css, html } from "../utils/utils";

export default class FlappyBird extends WebComponent {
  shadowStyle() {
    return css`
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }
    `;
  }

  shadowHTML() {
    return html`
      <h1>Flappy Bird</h1>
      <p>You are viewing the Flappy Bird component!</p>
    `;
  }
}
