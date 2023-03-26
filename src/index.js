import './style.scss';
import sandboxDB from './core/IndexedDB';
import App from './App';
import Footer from './view/Common/Footer';
import Home from './view/Home';
import Tetris from './view/Tetris';
import FlappyBird from './view/FlappyBird';
import Icons from './view/Common/Icons';
import Icon from './view/Common/Icon';
import NotePad from './view/NotePad';
import NotePadHeader from './view/NotePad/components/NotePadHeader';
import router from './core/Router';

(async () => {
  try {
    await sandboxDB.openDB();
  } catch (e) {
    queueMicrotask(() => alert('IndexedDB를 사용할 수 없습니다.'));
  }

  customElements.define('my-app', App);
  customElements.define('my-footer', Footer);
  customElements.define('my-home', Home);
  customElements.define('my-tetris', Tetris);
  customElements.define('my-flappybird', FlappyBird);
  customElements.define('my-icons', Icons);
  customElements.define('my-icon', Icon);
  customElements.define('my-notepad', NotePad);
  customElements.define('my-notepad-header', NotePadHeader);
})();

window.addEventListener('load', () => router.render());
window.addEventListener('popstate', () => router.render());
