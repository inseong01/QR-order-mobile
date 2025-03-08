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
