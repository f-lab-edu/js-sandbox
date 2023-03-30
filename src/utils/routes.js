import { html } from './utils';
import tetris from '../../public/tetris.png';
import flappyBird from '../../public/flappyBird.png';
import notepad from '../../public/notepad.png';
import sandboxDB from '../core/IndexedDB';

const BASE_URL = process.env.NODE_ENV === 'development' ? '' : '/js-sandbox';

const routes = [
  {
    path: `/`,
    html: html`<my-home></my-home>`,
    label: 'Home',
    iconSrc: null,
  },
  {
    path: `/tetris`,
    html: html`<my-tetris></my-tetris>`,
    label: 'Tetris',
    iconSrc: tetris,
  },
  {
    path: `/flappybird`,
    html: html`<my-flappybird></my-flappybird>`,
    label: 'Flappy&nbsp;Bird',
    iconSrc: flappyBird,
  },
  {
    path: `/notepad`,
    html: html`<my-notepad></my-notepad>`,
    label: 'Note&nbsp;Pad',
    iconSrc: notepad,
  },
  {
    path: `/notepad/:id`,
    html: html`<my-notepad data-id=":id"></my-notepad>`,
    label: 'Note&nbsp;Pad',
    iconSrc: null,
  },
];

const mainIcons = routes.reduce((prev, router) => {
  const { path, label, iconSrc } = router;
  if (!router.iconSrc) return prev;
  return [...prev, { path, label, iconSrc }];
}, []);

const getLocalIcons = async () => {
  const notepadData = await sandboxDB.getAllData('notepad');
  const notepadIcons = notepadData.reduce((prev, icon) => {
    const { id, title } = icon;
    return [...prev, { path: `/notepad/${id}`, label: title, iconSrc: notepad }];
  }, []);

  return [...notepadIcons];
};

export default routes;
export { mainIcons, getLocalIcons, BASE_URL };
