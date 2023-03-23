import { html } from '../utils/utils';

export default class WebComponent extends HTMLElement {
  constructor() {
    super();
    this.template = document.createElement('template');
    this.template.innerHTML = this.injectHTML();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.append(this.template.content.cloneNode(true));
  }

  injectHTML() {
    return ``;
  }
}
