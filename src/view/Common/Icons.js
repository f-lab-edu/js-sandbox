import { html } from '../../utils/utils';
import router from '../../core/Router';
import WebComponent from '../../core/WebComponent';
import { icons } from '../../utils/routes';

export default class Icons extends WebComponent {
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this.handleClick.bind(this));
    this.addEventListener('dblclick', this.handleDoubleClick.bind(this));
    this.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  injectHTML() {
    return html`
      ${icons
        .map((icon) => {
          return html`
            <my-icon data-path=${icon.path} data-label=${icon.label} data-iconSrc=${icon.iconSrc}></my-icon>
          `;
        })
        .join('')}
    `;
  }

  handleClick(e) {
    if (!e.target.closest('my-icon')) return;

    const icon = e.target.closest('my-icon');
    icon.toggleAttribute('checked');
    this.querySelectorAll('my-icon').forEach((node) => {
      if (node !== icon) {
        node.removeAttribute('checked');
      }
    });
  }

  handleDoubleClick(e) {
    if (!e.target.closest('my-icon')) return;

    const icon = e.target.closest('my-icon');
    router.navigateTo(icon.dataset.path);
  }

  handleKeyDown(e) {
    const checkedEl = this.querySelectorAll('my-icon[checked]');

    if (e.key === 'Enter') {
      if (checkedEl.length > 1) return;
      if (!checkedEl) return;
      router.navigateTo(checkedEl[0].dataset.path);
    }
  }
}
