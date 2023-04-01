export default class WebComponent extends HTMLElement {
  constructor() {
    super();
    this.render = this.render.bind(this);
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = this.injectHTML();
  }

  injectHTML() {
    return ``;
  }

  bindMethods(...methods) {
    methods.forEach((method) => {
      this[method] = this[method].bind(this);
    });
  }
}
