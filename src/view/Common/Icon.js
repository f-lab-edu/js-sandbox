import { html } from '../../utils/utils';
import WebComponent from '../../core/WebComponent';

export default class Icon extends WebComponent {
  getHTML() {
    const { label, iconsrc } = this.dataset;
    return html`
      <img alt="${label}_icon" src=${iconsrc} />
      ${label ? `<span class="icon_name">${label}</span>` : ''}
    `;
  }
}
