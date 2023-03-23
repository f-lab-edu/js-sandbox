import WebComponent from '../../core/WebComponent';
import { html } from '../../utils/utils';
import './styles.scss';

export default class NotePad extends WebComponent {
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('fullScreen', this.handleFullScreen.bind(this));
  }

  getHTML() {
    return html`
      <my-notepad-header></my-notepad-header>
      <my-notepad-body></my-notepad-body>
    `;
  }

  handleFullScreen() {
    this.classList.toggle('fullscreen');
  }
}
