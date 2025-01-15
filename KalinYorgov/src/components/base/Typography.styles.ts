import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

export const styles = StyleSheet.create({
    h1: {
        fontSize: typography.sizes.xxxl,
        fontWeight: typography.weights.bold,
        color: colors.text.primary,
        fontFamily: typography.families.bold,
    },
    h2: {
        fontSize: typography.sizes.xxl,
        fontWeight: typography.weights.bold,
        color: colors.text.primary,
        fontFamily: typography.families.bold,
    },
    h3: {
        fontSize: typography.sizes.xl,
        fontWeight: typography.weights.semibold,
        color: colors.text.primary,
        fontFamily: typography.families.semibold,
    },
    h4: {
        fontSize: typography.sizes.lg,
        fontWeight: typography.weights.semibold,
        color: colors.text.primary,
        fontFamily: typography.families.semibold,
    },
    body1: {
        fontSize: typography.sizes.base,
        fontWeight: typography.weights.regular,
        color: colors.text.primary,
        fontFamily: typography.families.regular,
    },
    body2: {
        fontSize: typography.sizes.sm,
        fontWeight: typography.weights.regular,
        color: colors.text.primary,
        fontFamily: typography.families.regular,
    },
    caption: {
        fontSize: typography.sizes.xs,
        fontWeight: typography.weights.regular,
        color: colors.text.secondary,
        fontFamily: typography.families.regular,
    },
});
