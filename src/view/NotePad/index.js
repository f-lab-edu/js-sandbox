import WebComponent from '../../core/WebComponent';
import { html } from '../../utils/utils';
import './styles.scss';

export default class NotePad extends WebComponent {
  connectedCallback() {
    super.connectedCallback();
  }

  injectHTML() {
    return html`
      <my-notepad-header></my-notepad-header>
      <my-notepad-body></my-notepad-body>
    `;
  }
}
