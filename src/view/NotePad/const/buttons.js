import router from '../../../core/Router';

const disable = true;

const buttons = [
  {
    id: 'file',
    title: '파일',
    key: 'F',
    slots: [
      { id: 1, text: '새로 만들기(N)', key: ['Ctrl', 'N'], onClick: handleNewClick },
      { id: 2, text: '내 컴퓨터에 저장(W)', key: ['Ctrl', 'Shift', 'N'], onClick: handleLocalSaveClick },
      { id: 3, text: '저장(S)', key: ['Ctrl', 'S'], onClick: handleSaveClick },
      { id: 4, text: '삭제(D)', key: ['Ctrl', 'Shift', 'S'], onClick: handleDeleteClick },
      { id: 5, text: '페이지 설정(U)...', key: [], disable },
      { id: 6, text: '인쇄(P)...', key: ['Ctrl', 'P'], disable },
      { id: 7, text: '끝내기(X)', key: [], disable },
    ],
  },
  {
    id: 'edit',
    title: '편집',
    key: 'E',
    slots: [
      { id: 8, text: '실행 취소(U)', key: ['Ctrl', 'Z'], disable },
      { id: 9, text: '잘라내기(T)', key: ['Ctrl', 'X'], disable },
      { id: 10, text: '복사(C)', key: ['Ctrl', 'C'], disable },
      { id: 11, text: '붙여넣기(P)', key: ['Ctrl', 'V'], disable },
      { id: 12, text: '삭제(D)', key: ['Del'], disable },
      { id: 13, text: 'Bing으로 검색(S)...', key: ['Ctrl', 'E'], disable },
      { id: 14, text: '찾기(F)...', key: ['Ctrl', 'F'], disable },
      { id: 15, text: '다음 찾기(N)', key: ['F3'], disable },
      { id: 16, text: '이전 찾기(V)', key: ['Shift', 'F3'], disable },
      { id: 17, text: '바꾸기(R)...', key: ['Ctrl', 'H'], disable },
      { id: 18, text: '이동(G)...', key: ['Ctrl', 'G'], disable },
      { id: 19, text: '모두 선택(A)', key: ['Ctrl', 'A'], disable },
      { id: 20, text: '시간/날짜(D)', key: ['F5'], disable },
    ],
  },
  {
    id: 'format',
    title: '서식',
    key: 'O',
    slots: [
      { id: 21, text: '자동 줄 바꿈(W)', key: [], disable },
      { id: 22, text: '글꼴(F)...', key: [], disable },
    ],
  },
  {
    id: 'view',
    title: '보기',
    key: 'V',
    slots: [
      { id: 23, text: '확대하기(Z)', key: ['Ctrl', '+'], disable },
      { id: 24, text: '축소하기(X)', key: ['Ctrl', '-'], disable },
      { id: 25, text: '상태 표시줄(S)', key: [], disable },
    ],
  },
  {
    id: 'help',
    title: '도움말',
    key: 'H',
    slots: [
      { id: 26, text: '도움말 보기(H)', key: [], disable },
      { id: 27, text: '피드백 보내기(F)', key: [], disable },
      { id: 28, text: '메모장 정보(A)', key: [], disable },
    ],
  },
];

const slots = buttons.reduce((acc, cur) => {
  return [...acc, ...cur.slots];
}, []);

export default buttons;
export { slots };

function handleSaveClick() {
  this.dispatchEvent(new CustomEvent('save', { bubbles: true }));
}

function handleLocalSaveClick() {
  this.dispatchEvent(new CustomEvent('localSave', { bubbles: true }));
}

function handleDeleteClick() {
  const notepad = document.querySelector('my-notepad');
  if (!notepad['data-id']) return;
  this.dispatchEvent(new CustomEvent('delete', { bubbles: true }));
}

function handleNewClick() {
  const notepad = document.querySelector('my-notepad');
  if (!notepad['data-id']) {
    notepad.render();
    return;
  }
  router.navigateTo('/notepad');
}
