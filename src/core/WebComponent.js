export default class WebComponent extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = this.injectHTML();
  }

  injectHTML() {
    return ``;
  }
}
