import { html } from "../utils/utils";

export default class Footer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = html`
      <style>
        :host {
          display: block;
          width: 100%;
          height: 100%;
        }
      </style>
      <h1>Footer</h1>
      <p>You are viewing the footer component!</p>
    `;
  }
}
