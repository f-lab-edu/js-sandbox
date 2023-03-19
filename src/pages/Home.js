import { css, html } from "../utils/utils";
import router from "../core/Router";
import WebComponent from "../core/WebComponent";

export default class Home extends WebComponent {
  shadowHTML() {
    return html`${router.icons
      .map((icon) => {
        return html`
          <my-icon
            data-path=${icon.path}
            data-label=${icon.label}
            data-iconSrc=${icon.iconSrc}
          ></my-icon>
        `;
      })
      .join("")}`;
  }

  shadowStyle() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
      }

      my-icon {
        height: 120px;
        width: 120px;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-sizing: border-box;
        border: 1px solid rgba(0, 0, 0, 0);
        color: white;
        font-size: large;
        user-select: none;
      }

      my-icon[checked] {
        background-color: rgba(129, 159, 217, 0.5);
        border: 1px solid rgba(122, 170, 255, 0.7);
      }

      my-icon:hover {
        background-color: rgba(129, 159, 217, 0.2);
        border: 1px solid rgba(122, 170, 255, 0.4);
      }

      my-icon[checked]:hover {
        background-color: rgba(129, 159, 217, 0.8);
        border: 1px solid rgba(122, 170, 255, 0.7);
      }
    `;
  }

  setEvents() {
    const handleClick = (e) => {
      e.target.toggleAttribute("checked");
      this.shadowRoot.querySelectorAll("my-icon[checked]").forEach((node) => {
        if (node !== e.target) {
          node.removeAttribute("checked");
        }
      });
    };

    const handleDoubleClick = (e) => {
      const { path } = e.target.dataset;
      if (path) {
        router.navigateTo(path);
      }
    };

    const handleKeyDown = (e) => {
      const checkedEl = this.shadowRoot.querySelectorAll("my-icon[checked]");

      if (e.key === "Enter") {
        if (checkedEl.length > 1) return;
        if (!checkedEl) return;
        router.navigateTo(checkedEl[0].dataset.path);
      }
    };

    this.shadowRoot.addEventListener("click", handleClick);
    this.shadowRoot.addEventListener("dblclick", handleDoubleClick);
    this.addEventListener("keydown", handleKeyDown);
  }
}
