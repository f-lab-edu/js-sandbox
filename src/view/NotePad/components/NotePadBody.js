import { html } from '../../../utils/utils';
import WebComponent from '../../../core/WebComponent';

export default class NotePadBody extends WebComponent {
  getHTML() {
    return html`<textarea></textarea>`;
  }
}
