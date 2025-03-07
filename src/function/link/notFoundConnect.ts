import { productURL } from '../../types/common';

export function notFoundConnect({ url, productURL }: { url: string; productURL: productURL }) {
  if (url.startsWith(`${productURL}/0/not-found`)) {
  }
}
