import { useState, useCallback } from 'react';
import { ErrorProps } from '../interface/ErrorProps';

interface ApiResponse<T> {
    data: T | null;
    loading: boolean;
    error: ErrorProps | null;
}

export const useApi = <T>() => {
    const [state, setState] = useState<ApiResponse<T>>({
        data: null,
        loading: false,
        error: null,
    });

    const callApi = useCallback(async (apiFunction: () => Promise<T>) => {
        setState(prevState => ({ ...prevState, loading: true, error: null }));
        try {
            const data = await apiFunction();
            setState({ data, loading: false, error: null });
        } catch (error) {
            setState({
                data: null,
                loading: false,
                error: { message: error instanceof Error ? error.message : 'An unknown error occurred' }
            });
        }
    }, []);

    return { ...state, callApi };
};
