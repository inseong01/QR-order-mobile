import { HistoryState } from '@/src/types/common';

export function setHistoryStack({ url, historyState }: { url: string; historyState: HistoryState }) {
  const { isGoBack, history, setHistory } = historyState;

  // history 설정
  const index = history.length === 0 ? 0 : history.length - 1;

  // 현재 URL PUSH 반복 방지
  if (history[index] !== url) {
    // 첫번째 URL POP 방지, 라우팅 여부 변화 감지
    if (index >= 1 && isGoBack) {
      setHistory((prev) => [...prev.slice(0, prev.length - 1)]);
      return;
    }

    // 주문 이후 URL 중첩 방지
    if (index >= 1 && history[index].includes('pickUpList')) {
      setHistory(() => [url]);
      return;
    }

    setHistory((prev) => [...prev, url]);
  }
}
