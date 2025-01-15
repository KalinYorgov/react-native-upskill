import { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { refreshSession } from '../store/slices/authSlice';

const REFRESH_INTERVAL = 20 * 60 * 1000;

export const useSessionRefresh = () => {
    const dispatch = useAppDispatch();
    const { isAuthenticated } = useAppSelector(state => state.auth);
    const refreshTimerRef = useRef<NodeJS.Timeout>();
    const lastRefreshRef = useRef<number>(Date.now());

    const refreshTokenIfNeeded = async () => {
        const now = Date.now();
        if (now - lastRefreshRef.current >= REFRESH_INTERVAL) {
            try {
                await dispatch(refreshSession()).unwrap();
                lastRefreshRef.current = now;
            } catch (error) {
                console.error('Failed to refresh session:', error);
            }
        }
    };

    const startRefreshTimer = () => {
        if (refreshTimerRef.current) {
            clearInterval(refreshTimerRef.current);
        }
        refreshTimerRef.current = setInterval(refreshTokenIfNeeded, REFRESH_INTERVAL);
    };

    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
        if (nextAppState === 'active' && isAuthenticated) {
            await refreshTokenIfNeeded();
            startRefreshTimer();
        } else if (nextAppState === 'background') {
            if (refreshTimerRef.current) {
                clearInterval(refreshTimerRef.current);
            }
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            refreshTokenIfNeeded();
            startRefreshTimer();
        } else if (refreshTimerRef.current) {
            clearInterval(refreshTimerRef.current);
        }

        const subscription = AppState.addEventListener('change', handleAppStateChange);

        return () => {
            if (refreshTimerRef.current) {
                clearInterval(refreshTimerRef.current);
            }
            subscription.remove();
        };
    }, [isAuthenticated]);
};