import WebComponent from "../core/WebComponent";
import { css, html } from "../utils/utils";

export default class NotePad extends WebComponent {
  shadowHTML() {
    return html`
      <h1>NotePad</h1>
      <p>You are viewing the NotePad component!</p>
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
