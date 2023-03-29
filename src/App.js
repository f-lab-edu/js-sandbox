import { html } from './utils/utils';
import WebComponent from './core/WebComponent';

export default class App extends WebComponent {
  injectHTML() {
    return html`
      <div id="page"></div>
      <my-icons tabindex="-1"></my-icons>
      <my-footer></my-footer>
    `;
  }
}
