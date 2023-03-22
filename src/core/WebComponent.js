import { html } from "../utils/utils";

export default class WebComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.template = document.createElement("template");
    this.template.innerHTML = html`
      <style>
        ${this.shadowStyle()}
      </style>
      ${this.shadowHTML()}
    `;
  }

  connectedCallback() {
    this.shadowRoot.appendChild(this.template.content.cloneNode(true));
    this.setEvents();
  }

  // shadowRoot css 정의
  shadowStyle() {
    return "";
  }

  // shadowRoot html 정의
  shadowHTML() {
    return "";
  }

  // 이벤트 정의
  setEvents() {}
}
