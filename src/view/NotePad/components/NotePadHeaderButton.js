import { html } from '../../../utils/utils';
import WebComponent from '../../../core/WebComponent';

export default class NotePadButton extends WebComponent {
  getHTML() {
    const { title, key, slots } = this.dataset;
    return html`
      ${title}(<u>${key}</u>)
      <div class="popup">
        ${JSON.parse(slots)
          .map(
            (slot) => html`
              <div class="slot" data-disable=${!!slot.disable}>
                <div>${slot.text}</div>
                ${slot.key.length > 0 ? `<div>${slot.key.join(' + ')}</div>` : ''}
              </div>
            `
          )
          .join('')}
      </div>
    `;
  }
}
