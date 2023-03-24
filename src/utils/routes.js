import { html } from './utils';
import tetris from '../../public/tetris.png';
import flappyBird from '../../public/flappyBird.png';
import notepad from '../../public/notepad.png';

const routes = [
  {
    path: '/',
    html: html`<my-home></my-home>`,
    label: 'Home',
    iconSrc: null,
  },
  {
    path: '/tetris',
    html: html`<my-tetris></my-tetris>`,
    label: 'Tetris',
    iconSrc: tetris,
  },
  {
    path: '/flappybird',
    html: html`<my-flappybird></my-flappybird>`,
    label: 'Flappy&nbsp;Bird',
    iconSrc: flappyBird,
  },
  {
    path: '/notepad',
    html: html`<my-notepad></my-notepad>`,
    label: 'Note&nbsp;Pad',
    iconSrc: notepad,
  },
];

const icons = routes.reduce((prev, router) => {
  const { path, label, iconSrc } = router;
  if (router.path === '/') return prev;
  return [...prev, { path, label, iconSrc }];
}, []);

export default routes;
export { icons };