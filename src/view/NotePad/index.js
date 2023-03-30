import WebComponent from '../../core/WebComponent';
import { html } from '../../utils/utils';
import './styles.scss';
import sandboxDB from '../../core/IndexedDB';
import NotePadIcon from '../../../public/notepad.png';
import router from '../../core/Router';

export default class NotePad extends WebComponent {
  async connectedCallback() {
    this.data = (await sandboxDB.getData('notepad', this.id)) ?? {
      title: '제목없음',
      content: '',
    };
    super.connectedCallback();
    this.addEventListener('save', this.handleSave);
    this.addEventListener('localSave', this.handleLocalSave);
    this.addEventListener('delete', this.handleDelete);
  }

  disconnectedCallback() {
    this.removeEventListener('save', this.handleSave);
    this.removeEventListener('localSave', this.handleLocalSave);
    this.removeEventListener('delete', this.handleDelete);
  }

  injectHTML() {
    const { title, content } = this.data;
    return html`
      <my-notepad-header title=${title}></my-notepad-header>
      <textarea>${content}</textarea>
    `;
  }

  handleLocalSave(e) {
    e.preventDefault();
    const notePadData = this.getNotePadData();
    if (!notePadData) return;
    const blob = new Blob([notePadData.content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${notePadData.title}.txt`;
    link.click();
  }

  async handleSave(e) {
    e.stopPropagation();
    const notePadData = this.getNotePadData();
    if (!notePadData) return;

    try {
      const result = await sandboxDB.upsertData('notepad', notePadData);

      const path = `/notepad/${result}`;

      alert('저장되었습니다.');
      const iconChangeEvent = new CustomEvent('iconChange', {
        detail: {
          path,
          label: notePadData,
          iconSrc: NotePadIcon,
        },
      });
      document.querySelector('my-icons').dispatchEvent(iconChangeEvent);

      if (this.id === result) {
        this.title = notePadData.title.replace(/&nbsp/g, ' ');
      } else {
        router.navigateTo(path);
      }
    } catch (err) {
      alert('저장에 실패했습니다.');
    }
  }

  async handleDelete(e) {
    try {
      e.stopPropagation();
      const confirmResult = window.confirm('정말 삭제하시겠습니까?');
      if (!confirmResult) return;

      await sandboxDB.deleteData('notepad', this.id);

      alert('삭제되었습니다.');
      const iconDeleteEvent = new CustomEvent('iconDelete', {
        detail: {
          path: `/notepad/${this.id}`,
        },
      });
      document.querySelector('my-icons').dispatchEvent(iconDeleteEvent);
      router.replaceTo('/notepad');
    } catch (err) {
      alert('삭제에 실패했습니다.');
    }
  }

  getNotePadData() {
    const contentEl = this.querySelector('textarea');
    const content = contentEl.value.trim();
    if (!content) {
      alert('내용이 없습니다.');
      return null;
    }

    let title;
    while (!title) {
      title = prompt('파일명을 입력하세요.', this.data.title.replace(/&nbsp;/g, ' '));
      if (!title) {
        const confirmResult = window.confirm('제목은 필수입니다.');
        if (!confirmResult) return null;
      }
    }

    return {
      id: this.id,
      title: title.trim().replace(/ /g, '&nbsp;'),
      content: content.replace(/ /g, '&nbsp;'),
    };
  }

  get id() {
    return Number(this.getAttribute('data-id'));
  }

  set title(title) {
    this.querySelector('my-notepad-header').setAttribute('title', title);
  }
}
