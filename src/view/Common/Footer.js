import WebComponent from '../../core/WebComponent';
import { html } from '../../utils/utils';
import { mainIcons } from '../../utils/routes';
import router from '../../core/Router';
import windowLogo from '../../../public/windowLogo.png';
import searchIcon from '../../../public/searchIcon.png';

export default class Footer extends WebComponent {
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this.handleClick.bind(this));
  }

  injectHTML() {
    return html`
      <img alt="window_logo" src=${windowLogo} class="window_icon" />
      <div class="input_box">
        <img alt="search" src=${searchIcon} class="window_icon" /><input type="text" placeholder="찾기" />
      </div>
      ${mainIcons
        .map((icon) => {
          return html` <my-icon data-path="${icon.path}" data-iconSrc="${icon.iconSrc}"></my-icon> `;
        })
        .join('')}
    `;
  }

  handleClick(e) {
    if (!e.target.closest('my-icon')) return;

    const icon = e.target.closest('my-icon');
    router.navigateTo(icon.dataset.path);
  }
}
