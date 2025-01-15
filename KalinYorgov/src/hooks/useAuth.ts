import { useAppSelector } from '../store/hooks';

export const useAuth = () => {
    const { isAuthenticated, user, loading, error } = useAppSelector(state => state.auth);

    return {
        isAuthenticated,
        user,
        loading,
        error,
        token: user?.token
    };
};
