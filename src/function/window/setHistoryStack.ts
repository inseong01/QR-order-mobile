import { SetStateAction } from 'react';

export function setHistoryStack({
  history,
  url,
  setHistory,
  isGoBack,
}: {
  history: string[];
  url: string;
  setHistory: (value: SetStateAction<string[]>) => void;
  isGoBack: boolean;
}) {
  // history 설정
  const index = history.length === 0 ? 0 : history.length - 1;
  // 현재 URL PUSH 반복 방지
  if (history[index] !== url) {
    // 첫번째 URL POP 방지, 라우팅 여부 변화 감지
    if (index >= 1 && isGoBack) {
      setHistory((prev) => [...prev.slice(0, prev.length - 1)]);
      return;
    }
    setHistory((prev) => [...prev, url]);
  }
}
