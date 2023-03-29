import WebComponent from '../../core/WebComponent';
import { html } from '../../utils/utils';
import './styles.scss';
import sandboxDB from '../../core/IndexedDB';
import NotePadIcon from '../../../public/notepad.png';

export default class NotePad extends WebComponent {
  async connectedCallback() {
    this.data = (await sandboxDB.getData('notepad', Number(this.getAttribute('id')))) ?? {
      title: '제목없음',
      content: '',
    };
    super.connectedCallback();
    this.addEventListener('save', this.handleSave);
    this.addEventListener('localSave', this.handleLocalSave);
  }

  disconnectedCallback() {
    this.removeEventListener('save', this.handleSave);
    this.removeEventListener('localSave', this.handleLocalSave);
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
    this.reset();
  }

  async handleSave(e) {
    try {
      e.stopPropagation();
      const notePadData = this.getNotePadData();
      if (!notePadData) return;

      const result = await sandboxDB.upsertData('notepad', notePadData);
      if (!result) return;

      alert('저장되었습니다.');
      const iconChangeEvent = new CustomEvent('iconChange', {
        detail: {
          path: `/notepad/${result}`,
          label: notePadData.title.replace(/ /g, '&nbsp;'),
          iconSrc: NotePadIcon,
        },
      });
      document.querySelector('my-icons').dispatchEvent(iconChangeEvent);
    } catch (err) {
      alert('저장에 실패했습니다.');
      console.error(err);
    }
    this.reset();
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
      title = prompt('파일명을 입력하세요.', '제목없음');
      if (!title) {
        const confirmResult = window.confirm('제목은 필수입니다.');
        if (!confirmResult) return null;
      }
    }

    return {
      title: title.trim().replace(/ /g, '&nbsp;'),
      content: content.replace(/ /g, '&nbsp;').replace(/\n/g, '<br>').replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;'),
    };
  }

  reset() {
    this.querySelector('textarea').value = '';
  }
}
