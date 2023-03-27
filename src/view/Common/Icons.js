import { html } from '../../utils/utils';
import router from '../../core/Router';
import WebComponent from '../../core/WebComponent';
import { getLocalIcons, mainIcons } from '../../utils/routes';

export default class Icons extends WebComponent {
  async connectedCallback() {
    this.icons = [...mainIcons, ...(await getLocalIcons())];
    super.connectedCallback();
    this.addEventListener('click', this.handleClick);
    this.addEventListener('dblclick', this.handleDoubleClick);
    this.addEventListener('keydown', this.handleKeyDown);
    this.addEventListener('iconChange', this.handleIconChange);
    this.addEventListener('iconDelete', this.handleIconDelete);
  }

  static get observedAttributes() {
    return ['icons'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    this.render();
  }

  injectHTML() {
    return html`
      ${this.icons
        .map((icon) => {
          return html`
            <my-icon data-path=${icon.path} data-label=${icon.label} data-iconSrc=${icon.iconSrc}></my-icon>
          `;
        })
        .join('')}
    `;
  }

  get icons() {
    return JSON.parse(this.getAttribute('icons'));
  }

  set icons(value) {
    this.setAttribute('icons', JSON.stringify(value));
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

  handleIconChange(e) {
    const { path, label, iconSrc } = e.detail;
    const prevIconIndex = this.icons.findIndex((icon) => icon.path === path);

    if (prevIconIndex === -1) {
      this.icons = [...this.icons, { path, label, iconSrc }];
    } else {
      const newIcons = [...this.icons];
      newIcons[prevIconIndex] = { path, label, iconSrc };
      this.icons = newIcons;
    }
  }

  handleIconDelete(e) {
    const { path } = e.detail;
    const newIcons = this.icons.filter((icon) => icon.path !== path);
    this.icons = newIcons;
  }
}
