import { ServerUnavailableException, UnexpectedException } from '../exceptions/CustomExceptions';
import { OCAPI_CLIENT_ID, ORIGIN } from '../services/config';

const buildOptions = (data?: any, additionalHeaders?: any): RequestInit => {
    return {
        headers: {
            "Content-Type": "application/json",
            "x-dw-client-id": OCAPI_CLIENT_ID,
            "Origin": ORIGIN,
            ...additionalHeaders
        },
        body: data ? JSON.stringify(data) : undefined,
    };
};
export const request = async (method: string, url: string, data?: any, additionalHeaders?: any) => {
    try {
        const response = await fetch(url, {
            method,
            ...buildOptions(data, additionalHeaders)
        });

        if (!response.ok) {
            switch(response.status) {
                case 521:
                case 500:
                    throw new ServerUnavailableException(`Server error: ${response.status}`);
                case 404:
                    throw new Error('Resource not found');
                case 400:
                    const errorText = await response.text();
                    console.error('API Error Response:', errorText);
                    throw new Error(`Bad Request: ${errorText}`);
                default:
                    throw new Error(`HTTP error! status: ${response.status}`);
            }
        }

        return await response.json();
    } catch (error) {
        console.error('Request error:', error);
        if (error instanceof Error) {
            throw error;
        }
        throw new UnexpectedException();
    }
};