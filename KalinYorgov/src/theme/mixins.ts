import { colors } from './colors';
import { spacing } from './spacing';

export const mixins = {
    screenContainer: {
        flex: 1,
        padding: spacing.screenPadding,
        backgroundColor: colors.background,
    },
    card: {
        borderRadius: 8,
        backgroundColor: colors.background.primary,
        shadowColor: colors.shadow,

    },
}
