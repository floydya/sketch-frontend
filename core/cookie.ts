import { Cookies } from "react-cookie";

export const setCookie = (key: string, value: string) => {
  if (process.browser) {
    const cookie = new Cookies();
    cookie.set(key, value);
  }
};

export const removeCookie = (key: string) => {
  if (process.browser) {
    const cookie = new Cookies();
    cookie.remove(key);
  }
};

export const getCookie = (key: string, req) => {
  return process.browser
    ? getCookieFromBrowser(key)
    : getCookieFromServer(key, req);
};

const getCookieFromBrowser = (key: string) => new Cookies().get(key);

const getCookieFromServer = (key: string, req) => {
  if (!req.headers.cookie) {
    return undefined;
  }
  const rawCookie = req.headers.cookie
    .split(";")
    .find((c) => c.trim().startsWith(`${key}=`));
  if (!rawCookie) {
    return undefined;
  }
  return rawCookie.split("=")[1];
};
