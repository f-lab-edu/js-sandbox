import WebComponent from '../../core/WebComponent';
import { html } from '../../utils/utils';

export default class FlappyBird extends WebComponent {
  getHTML() {
    return html`
      <h1>Flappy Bird</h1>
      <p>You are viewing the Flappy Bird component!</p>
      <p>You are viewing the Flappy Bird component!</p>
      <p>You are viewing the Flappy Bird component!</p>
      <p>You are viewing the Flappy Bird component!</p>
      <p>You are viewing the Flappy Bird component!</p>
      <p>You are viewing the Flappy Bird component!</p>
    `;
  }
}
