import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.background.primary,
        justifyContent: 'center',
    },
    button: {
        backgroundColor: colors.primary,
        padding: 15,
        borderRadius: 8,
        marginVertical: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: '600',
    },
});