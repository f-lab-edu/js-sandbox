import { html } from '../utils/utils';

export default class ShadowComponent extends HTMLElement {
  constructor() {
    super();
    this.template = document.createElement('template');
    this.template.innerHTML = html`
      <style>
        ${this.injectShadowStyle()}
      </style>
      ${this.injectShadowHTML()}
    `;
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.append(this.template.content.cloneNode(true));
  }

  // shadowRoot css 정의
  injectShadowStyle() {
    return '';
  }

  // shadowRoot html 정의
  injectShadowHTML() {
    return '';
  }

  // 이벤트 정의
}
