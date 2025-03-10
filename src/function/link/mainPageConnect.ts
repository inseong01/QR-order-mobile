import { WebViewURL } from '../../types/common';
import { checkValidTableValue } from '../checkValidTableValue';
import { setCookies } from '../cookie/setCookies';

export async function mainPageConnect({ url, webViewURI }: { url: string; webViewURI: WebViewURL }) {
  if (url.startsWith(`${webViewURI}/`)) {
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
