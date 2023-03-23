import { html } from '../../../utils/utils';
import WebComponent from '../../../core/WebComponent';
import buttons from '../const/buttons';

export default class NotePadHeader extends WebComponent {
  connectedCallback() {
    super.connectedCallback();
  }

  getHTML() {
    return html`
      <header>
        <span><img alt="notepad_icon" src="/notepad.png" />제목없음 - Windows 메모장</span>
        <div class="view_buttons">
          <button id="mini">🗕</button>
          <button id="full">🗖</button>
          <button id="close">Ⅹ</button>
        </div>
      </header>
      <div class="edit_buttons">
        ${buttons
          .map(
            (button) =>
              html`
                <my-notepad-button
                  id=${button.id}
                  data-title=${button.title}
                  data-key=${button.key}
                  data-slots=${JSON.stringify(button.slots)}
                ></my-notepad-button>
              `
          )
          .join('')}
      </div>
    `;
  }
}
