import './style.scss';
import sandboxDB from './core/IndexedDB';
import Home from './view/Home';
import Tetris from './view/Tetris';
import FlappyBird from './view/FlappyBird';
import Icon from './view/Common/Icon';
import App from './App';
import NotePad from './view/NotePad';
import NotePadHeader from './view/NotePad/components/NotePadHeader';
import NotePadBody from './view/NotePad/components/NotePadBody';
import Icons from './view/Common/Icons';
import Footer from './view/Common/Footer';
import NotePadButton from './view/NotePad/components/NotePadHeaderButton';

sandboxDB.openDB();

customElements.define('my-app', App);
customElements.define('my-footer', Footer);
customElements.define('my-home', Home);
customElements.define('my-tetris', Tetris);
customElements.define('my-flappybird', FlappyBird);
customElements.define('my-icons', Icons);
customElements.define('my-icon', Icon);
customElements.define('my-notepad', NotePad);
customElements.define('my-notepad-header', NotePadHeader);
customElements.define('my-notepad-body', NotePadBody);
customElements.define('my-notepad-button', NotePadButton);
