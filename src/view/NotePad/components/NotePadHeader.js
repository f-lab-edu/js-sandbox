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
        <span><img alt="notepad_icon" src=${NotePadIcon} />제목없음 - Windows 메모장</span>
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
    closePopup.call(this);
    const sub = e.target.closest('.sub');
    if (sub) {
      const slotId = Number(sub.dataset.id);
      const { onClick } = slots.find((slot) => slot.id === slotId) || {};
      if (onClick) {
        onClick.call(this);
        return;
      }
    }

    switch (e.target.className) {
      case 'view_button':
        clickViewButton.call(this, e.target);
        break;
      case 'edit_button':
        showPopup.call(this, e.target);
        break;
      default:
        break;
    }

    function clickViewButton(vTarget) {
      switch (vTarget.id) {
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

    function showPopup(sTarget) {
      this.querySelectorAll('.popup').forEach((popup) => {
        popup.classList.toggle('show', popup === sTarget.querySelector('.popup'));
      });
    }

    function closePopup() {
      this.querySelector('.popup.show')?.classList.remove('show');
    }
  }
}
