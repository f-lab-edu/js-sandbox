const buttons = [
  {
    id: 'file',
    title: '파일',
    key: 'F',
    slots: [
      { text: '새로&nbsp;만들기(N)', key: ['Ctrl', 'N'], disable: true },
      { text: '새&nbsp;창(W)', key: ['Ctrl', 'Shift', 'N'], disable: true },
      { text: '저장(S)', key: ['Ctrl', 'S'] },
      { text: '삭제(D)', key: ['Ctrl', 'Shift', 'S'], disable: true },
      { text: '페이지&nbsp;설정(U)...', key: [], disable: true },
      { text: '인쇄(P)...', key: ['Ctrl', 'P'], disable: true },
      { text: '끝내기(X)', key: [], disable: true },
    ],
  },
  {
    id: 'edit',
    title: '편집',
    key: 'E',
    slots: [
      { text: '실행&nbsp;취소(U)', key: ['Ctrl', 'Z'], disable: true },
      { text: '잘라내기(T)', key: ['Ctrl', 'X'], disable: true },
      { text: '복사(C)', key: ['Ctrl', 'C'], disable: true },
      { text: '붙여넣기(P)', key: ['Ctrl', 'V'], disable: true },
      { text: '삭제(D)', key: ['Del'], disable: true },
      { text: 'Bing으로&nbsp;검색(S)...', key: ['Ctrl', 'E'], disable: true },
      { text: '찾기(F)...', key: ['Ctrl', 'F'], disable: true },
      { text: '다음&nbsp;찾기(N)', key: ['F3'], disable: true },
      { text: '이전&nbsp;찾기(V)', key: ['Shift', 'F3'], disable: true },
      { text: '바꾸기(R)...', key: ['Ctrl', 'H'], disable: true },
      { text: '이동(G)...', key: ['Ctrl', 'G'], disable: true },
      { text: '모두&nbsp;선택(A)', key: ['Ctrl', 'A'], disable: true },
      { text: '시간/날짜(D)', key: ['F5'], disable: true },
    ],
  },
  {
    id: 'format',
    title: '서식',
    key: 'O',
    slots: [
      { text: '자동&nbsp;줄&nbsp;바꿈(W)', key: [], disable: true },
      { text: '글꼴(F)...', key: [], disable: true },
    ],
  },
  {
    id: 'view',
    title: '보기',
    key: 'V',
    slots: [
      { text: '확대하기(Z)', key: ['Ctrl', '+'], disable: true },
      { text: '축소하기(X)', key: ['Ctrl', '-'], disable: true },
      { text: '상태&nbsp;표시줄(S)', key: [], disable: true },
    ],
  },
  {
    id: 'help',
    title: '도움말',
    key: 'H',
    slots: [
      { text: '도움말&nbsp;보기(H)', key: [], disable: true },
      { text: '피드백&nbsp;보내기(F)', key: [], disable: true },
      { text: '메모장&nbsp;정보(A)', key: [], disable: true },
    ],
  },
];

export default buttons;
