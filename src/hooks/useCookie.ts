import { useState } from "react";

interface UseCookieOptions {
    initialValue: string;
    key: string;
    options?: CookieOptions;
}

interface CookieOptions {
    path?: string;
    expires?: Date | string;
    maxAge?: number;
    domain?: string;
    secure?: boolean;
    sameSite?: 'Strict' | 'Lax' | 'None';
}

export const useCookie = ({ initialValue, key, options = {} }: UseCookieOptions): [string, (value: string, options?: CookieOptions) => void, () => void] => {
    const [cookieValue, setCookieValue] = useState<string>(() => {
        const cookie = document.cookie.split('; ').find(row => row.startsWith(`${key}=`));
        return cookie ? decodeURIComponent(cookie.split('=')[1]) : initialValue;
    });

    const setCookie = (value: string, options: CookieOptions = {}) => {
        const { path = '/', expires, maxAge, domain, secure, sameSite } = options;
        let cookieString = `${key}=${encodeURIComponent(value)}`;

        if (expires) {
            cookieString += `; expires=${new Date(expires).toUTCString()}`;
        }
        if (maxAge) {
            cookieString += `; max-age=${maxAge}`;
        }
        if (domain) {
            cookieString += `; domain=${domain}`;
        }
        if (path) {
            cookieString += `; path=${path}`;
        }
        if (secure) {
            cookieString += `; secure`;
        }
        if (sameSite) {
            cookieString += `; samesite=${sameSite}`;
        }

        document.cookie = cookieString;
        setCookieValue(value);
    };

    const removeCookie = () => {
        setCookie('', { ...options, maxAge: -1 });
    };

    return [cookieValue, setCookie, removeCookie];
};