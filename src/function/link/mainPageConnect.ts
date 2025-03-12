import { WebViewURL } from '../../types/common';
import { checkValidTableValue } from '../checkValidTableValue';
import { findTableCookie, setCookies } from '../cookie/setCookies';

export async function mainPageConnect({ url, webViewURI }: { url: string; webViewURI: WebViewURL }) {
  const isExistTableCookie = await findTableCookie({ url });

  // 쿠키 중복 설정 방지
  if (isExistTableCookie) return;

  if (url.startsWith(`${webViewURI}`)) {
    // tableName 여부 검증
    const urlArr = url.split('/');
    const tableName = urlArr.length > 2 ? urlArr[3] : undefined;
    const isValide = checkValidTableValue(tableName);

    // tableName 쿠키 설정
    if (tableName && isValide) {
      setCookies({ url, tableName });
    }
  }
}
