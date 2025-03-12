import CookieManager, { Cookie } from '@react-native-cookies/cookies';

export async function setCookies({ url, tableName }: { url: string; tableName: string }) {
  const cookies: Cookie = {
    name: 'table',
    value: tableName,
    path: '/',
    httpOnly: true,
  };
  await CookieManager.set(url, cookies);
}

export async function findTableCookie({ url }: { url: string }) {
  const { table } = await CookieManager.get(url);
  if (table.value) return true;
  return false;
}
