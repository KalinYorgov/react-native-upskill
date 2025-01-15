import CookieManager from '@react-native-cookies/cookies';
import cookieParser from 'set-cookie-parser';
import { OCAPI_INSTANCE_HOST } from '../services/config';

export const clearCookies = async () => {
    await CookieManager.clearAll();
    await CookieManager.flush();
};

export const parseCookies = async (header: string) => {
    await clearCookies();
    const cookies = cookieParser.splitCookiesString(header);
    await Promise.all(
        cookies.map((cookie: string) =>
            CookieManager.setFromResponse(OCAPI_INSTANCE_HOST, cookie)
        )
    );
    await CookieManager.flush();
};