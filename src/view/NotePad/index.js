import WebComponent from '../../core/WebComponent';
import { html } from '../../utils/utils';
import './styles.scss';
import sandboxDB from '../../core/IndexedDB';
import NotePadIcon from '../../../public/notepad.png';

export default class NotePad extends WebComponent {
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('save', this.handleSave);
    this.addEventListener('localSave', this.handleLocalSave);
  }

  disconnectedCallback() {
    this.removeEventListener('save', this.handleSave);
    this.removeEventListener('localSave', this.handleLocalSave);
  }

  injectHTML() {
    return html`
      <my-notepad-header></my-notepad-header>
      <textarea></textarea>
    `;
  }

  handleLocalSave() {
    const notePadData = this.getNotePadData();
    if (notePadData === 'fail') return;

    try {
      const blob = new Blob([notePadData.content], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${notePadData.title}.txt`;
      link.click();
    } catch (err) {
      alert('저장에 실패했습니다.');
      console.error(err);
    } finally {
      this.querySelector('textarea').value = '';
    }
  }

  async handleSave(e) {
    e.stopPropagation();
    const notePadData = this.getNotePadData();
    if (notePadData === 'fail') return;

    try {
      const result = await sandboxDB.upsertData('notepad', {
        title: notePadData.title,
        content: notePadData.content,
      });
      if (result) {
        alert('저장되었습니다.');
      }
      document.querySelector('my-icons').dispatchEvent(
        new CustomEvent('iconChange', {
          detail: {
            path: `/notepad/${result}`,
            label: notePadData.title,
            iconSrc: NotePadIcon,
          },
        })
      );
    } catch (err) {
      alert('저장에 실패했습니다.');
      console.error(err);
    } finally {
      this.querySelector('textarea').value = '';
    }
  }

  getNotePadData() {
    const content = this.querySelector('textarea').value;
    if (!content) {
      alert('내용이 없습니다.');
      return 'fail';
    }
    let title = prompt('저장할 파일명을 입력하세요', '제목없음');
    while (title === null || title === undefined || title === '') {
      if (title === null) return 'fail';
      title = prompt('파일명은 필수입니다.', '제목없음');
    }

    return { title, content };
  }
}
