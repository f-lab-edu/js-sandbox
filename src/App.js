import router from './core/Router';
import { html } from './utils/utils';
import WebComponent from './core/WebComponent';

export default class App extends WebComponent {
  constructor() {
    super();
    router.render();
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('popstate', () => router.render());
  }

  injectHTML() {
    return html`
      <my-icons slot="icons" tabindex="-1"></my-icons>
      <my-footer slot="footer"></my-footer>
    `;
  }
}
