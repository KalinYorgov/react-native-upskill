import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        width: 30,
        height: 30,
        backgroundColor: colors.background.secondary,
        borderRadius: spacing.borderRadius.sm,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    buttonText: {
        fontSize: 18,
        color: colors.text.primary,
    },
    quantity: {
        marginHorizontal: spacing.md,
        minWidth: 30,
        textAlign: 'center',
        fontSize: 16,
    },
});