import { ProductURL } from '../../types/common';

export function notFoundConnect({ url, productURL }: { url: string; productURL: ProductURL }) {
  if (url.startsWith(`${productURL}/0/not-found`)) {
  }
}
