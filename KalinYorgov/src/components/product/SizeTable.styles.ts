import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

export const styles = StyleSheet.create({
    container: {
        marginTop: spacing.md,
        paddingHorizontal: spacing.md,
    },
    title: {
        fontSize: typography.sizes.lg,
        fontWeight: typography.weights.bold,
        color: colors.primary,
        marginBottom: spacing.sm,
    },
    sizesContainer: {
        paddingVertical: spacing.sm,
    },
    sizeButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: colors.border.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.sm,
        backgroundColor: colors.white,
    },
    selectedSizeButton: {
        borderColor: colors.primary,
        backgroundColor: colors.primary,
    },
    sizeText: {
        fontSize: typography.sizes.base,
        color: colors.text.primary,
    },
    selectedSizeText: {
        color: colors.white,
    },
    noSizesText: {
        fontSize: typography.sizes.base,
        color: colors.text.secondary,
        fontStyle: 'italic',
        textAlign: 'center',
        paddingVertical: spacing.sm,
    },
});
