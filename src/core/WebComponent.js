import { html } from '../utils/utils';

export default class WebComponent extends HTMLElement {
  constructor() {
    super();
    this.template = document.createElement('template');

    if (this.getShadowStyle() && this.getShadowHTML()) {
      this.attachShadow({ mode: 'open' });
      this.template.innerHTML = html`
        <style>
          ${this.getShadowStyle()}
        </style>
        ${this.getShadowHTML()}
      `;
    } else {
      this.template.innerHTML = this.getHTML();
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    if (this.shadowRoot) {
      this.shadowRoot.append(this.template.content.cloneNode(true));
    } else {
      this.append(this.template.content.cloneNode(true));
    }
  }

  getHTML() {
    return ``;
  }

  // shadowRoot css 정의
  getShadowStyle() {
    return '';
  }

  // shadowRoot html 정의
  getShadowHTML() {
    return '';
  }

  // 이벤트 정의
}
