import { HistoryState } from '@/src/types/common';

export function setHistoryStack({ url, historyState }: { url: string; historyState: HistoryState }) {
  const { isGoBack, history, setHistory } = historyState;

  // history 이전 인덱스 설정
  const index = history.length === 0 ? 0 : history.length - 1;

  // 현재 URL PUSH 반복 방지
  if (history[index] !== url) {
    // 첫번째 URL POP 방지
    if (index >= 1) {
      // 라우팅 여부 변화 감지
      if (isGoBack) {
        setHistory((prev) => [...prev.slice(0, prev.length - 1)]);
        return;
      }

      // 특정 URL 중첩 방지
      const isReplacePage =
        history[index].includes('pickUpList') ||
        history[index].includes('github') ||
        history[index].includes('not-found');
      switch (isReplacePage) {
        case true: {
          setHistory(() => [url]);
          return;
        }
        case false: {
          return;
        }
      }
    }

    // 히스토리 추가
    setHistory((prev) => [...prev, url]);
  }
}
