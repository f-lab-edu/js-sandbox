import { css, html } from "../utils/utils";
import WebComponent from "../core/WebComponent";

export default class Icon extends WebComponent {
  shadowHTML() {
    const { label, iconsrc } = this.dataset;
    return html`
      <div class="icon_container">
        <img alt="${label}_icon" src=${iconsrc} />
      </div>
      <div class="icon_name">${label}</div>
    `;
  }

  shadowStyle() {
    return css`
      .icon_container {
        display: flex;
        flex: 3;
        padding: 10px;
      }

      .icon_container img {
        margin: auto;
        width: 80%;
        object-fit: cover;
      }

      .icon_name {
        flex: 1;
        display: flex;
        align-items: center;
      }
    `;
  }
}
