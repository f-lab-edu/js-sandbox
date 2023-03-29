import { html } from '../../../utils/utils';
import WebComponent from '../../../core/WebComponent';
import buttons, { slots } from '../const/buttons';
import NotePadIcon from '../../../../public/notepad.png';
import router from '../../../core/Router';

export default class NotePadHeader extends WebComponent {
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this.handleClick);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.handleClick);
  }

  injectHTML() {
    return html`
      <header>
        <span>
          <img alt="notepad_icon" src=${NotePadIcon} />
          ${this.title} - Windows 메모장
        </span>
        <div class="view_buttons">
          <button class="view_button" id="mini">🗕</button>
          <button class="view_button" id="full">🗖</button>
          <button class="view_button" id="close">Ⅹ</button>
        </div>
      </header>
      <div class="edit_buttons">
        ${buttons
          .map(
            (button) => html`
              <button class="edit_button">
                ${button.title}(<u>${button.key}</u>)
                <div class="popup">
                  ${button.slots
                    .map(
                      (slot) => html`
                        <div class="sub" data-id="${slot.id}" data-disable="${!!slot.disable}">
                          <div>${slot.text}</div>
                          ${slot.key.length > 0 ? `<div>${slot.key.join(' + ')}</div>` : ''}
                        </div>
                      `
                    )
                    .join('')}
                </div>
              </button>
            `
          )
          .join('')}
      </div>
    `;
  }

  handleClick(e) {
    const viewButton = e.target.closest('.view_button');
    const editButton = e.target.closest('.edit_button');
    const sub = e.target.closest('.sub');

    if (viewButton) {
      this.clickViewButton(viewButton);
    } else if (editButton) {
      this.clickEditButton(editButton, sub);
    } else {
      this.closePopup();
    }
  }

  clickViewButton(viewButton) {
    switch (viewButton.id) {
      case 'full':
        this.parentElement.classList.toggle('fullscreen');
        break;
      case 'mini':
      case 'close':
        router.back();
        break;
      default:
        break;
    }
  }

  clickEditButton(editButton, sub) {
    this.closePopup();
    if (sub) {
      const slotId = Number(sub.dataset.id);
      const { onClick } = slots.find((slot) => slot.id === slotId) || {};
      if (onClick) {
        onClick.call(this);
      }
    } else {
      const popup = editButton.querySelector('.popup');
      popup.classList.toggle('show');
    }
  }

  closePopup() {
    const popup = this.querySelector('.popup.show');
    if (popup) {
      popup.classList.remove('show');
    }
  }

  get title() {
    return this.getAttribute('title');
  }
}
