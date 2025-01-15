import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export const styles = StyleSheet.create({
    webview: {
        flex: 1,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        color: colors.error,
    },
    errorInfo: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 20,
        color: colors.text.secondary,
    },
    retryButton: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 5,
    },
    retryButtonText: {
        color: colors.white,
        fontSize: 16,
    },
});
