import * as Keychain from 'react-native-keychain';
import { encode } from 'base-64';
import { OCAPI_CLIENT_ID, ORIGIN, ocapiUrl } from './config';
import { parseCookies } from '../utils/cookies';

interface AuthResponse {
    login: string;
    token: string;
}

const buildHeaders = (additionalHeaders?: Record<string, string>) => ({
    'Content-Type': 'application/json',
    'x-dw-client-id': OCAPI_CLIENT_ID,
    'Origin': ORIGIN,
    ...additionalHeaders
});

const getAccessToken = async (): Promise<string> => {
    try {
        const response = await fetch(`${ocapiUrl}/customers/auth`, {
            method: 'POST',
            headers: buildHeaders({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                type: 'guest'
            })
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('Access token response:', error);
            throw new Error(error.fault?.message || 'Failed to get access token');
        }

        return response.headers.get('authorization') || '';
    } catch (error) {
        console.error('Access token error:', error);
        throw error;
    }
};

export const loginUser = async (username: string, password: string): Promise<AuthResponse> => {
    try {
        const url = `${ocapiUrl}/customers/auth`;
        const response = await fetch(url, {
            method: 'POST',
            headers: buildHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Basic ${encode(`${username}:${password}`)}`
            }),
            body: JSON.stringify({
                type: 'credentials'
            })
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.fault?.message || 'Login failed');
        }

        const token = response.headers.get('authorization') || '';
        await Keychain.setGenericPassword(username, password);

        return {
            login: username,
            token
        };
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

export const signUpUser = async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}): Promise<AuthResponse> => {
    try {
        const accessToken = await getAccessToken();
        const response = await fetch(`${ocapiUrl}/customers`, {
            method: 'POST',
            headers: buildHeaders({
                'Content-Type': 'application/json',
                'Authorization': accessToken
            }),
            body: JSON.stringify({
                customer: {
                    login: userData.email,
                    email: userData.email,
                    first_name: userData.firstName,
                    last_name: userData.lastName
                },
                password: userData.password
            })
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.fault?.message || 'Registration failed');
        }

        return await loginUser(userData.email, userData.password);
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
};

export const refreshToken = async (): Promise<string | null> => {
    try {
        const credentials = await Keychain.getGenericPassword();
        if (!credentials) {
            return null;
        }

        const response = await fetch(`${ocapiUrl}/customers/auth/refresh-token`, {
            method: 'POST',
            headers: buildHeaders({
                'Content-Type': 'application/json',
                'Authorization': credentials.password
            })
        });

        if (!response.ok) {
            throw new Error('Token refresh failed');
        }

        const newToken = response.headers.get('authorization');
        if (newToken) {
            await Keychain.setGenericPassword(credentials.username, newToken);
            return newToken;
        }

        return null;
    } catch (error) {
        console.error('Token refresh error:', error);
        return null;
    }
};

export const logout = async (): Promise<void> => {
    await Keychain.resetGenericPassword();
};

export const getStoredCredentials = async () => {
    const credentials = await Keychain.getGenericPassword();
    return credentials;
};

export const authenticate = async (token: string): Promise<void> => {
    try {
        const response = await fetch(`${ocapiUrl}/sessions`, {
            method: 'POST',
            headers: buildHeaders({
                'Authorization': token
            })
        });
        const header = response.headers.get('Set-Cookie') ?? ''
        await parseCookies(header)
    } catch (error) {
        console.error('Authentication error:', error);
        throw error;
    }
};