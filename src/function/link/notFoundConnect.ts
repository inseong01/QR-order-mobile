import { WebViewURL } from '../../types/common';

export function notFoundConnect({ url, webViewURI }: { url: string; webViewURI: WebViewURL }) {
  if (url.startsWith(`${webViewURI}/0/not-found`)) {
  }
}
