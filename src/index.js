import "./style.scss";
import Home from "./pages/Home";
import Tetris from "./pages/Tetris";
import FlappyBird from "./pages/FlappyBird";
import Icon from "./components/Icon";
import App from "./App";
import NotePad from "./pages/NotePad";

customElements.define("my-app", App);
customElements.define("my-home", Home);
customElements.define("my-tetris", Tetris);
customElements.define("my-flappybird", FlappyBird);
customElements.define("my-icon", Icon);
customElements.define("my-notepad", NotePad);
