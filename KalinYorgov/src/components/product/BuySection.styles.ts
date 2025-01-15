import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

export const styles = StyleSheet.create({
    container: {
        padding: spacing.md,
        paddingBottom: spacing.sm,
        backgroundColor: colors.white,
        borderTopWidth: 1,
        borderTopColor: colors.border.primary,
    },
    addToCartButton: {
        backgroundColor: colors.primary,
        padding: spacing.md,
        borderRadius: spacing.borderRadius.md,
        alignItems: 'center',
    },
    buttonText: {
        color: colors.white,
        fontSize: typography.sizes.lg,
        fontWeight: typography.weights.bold,
    },
    errorText: {
        color: colors.error,
        fontSize: typography.sizes.sm,
        marginBottom: spacing.sm,
        textAlign: 'center',
    },
    disabledButton: {
        backgroundColor: colors.background.disabled,
        opacity: 0.7,
    },
    disabledButtonText: {
        color: colors.text.disabled,
    },
});
