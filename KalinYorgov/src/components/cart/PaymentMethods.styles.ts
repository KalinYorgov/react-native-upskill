import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

export const styles = StyleSheet.create({
    container: {
        marginTop: spacing.lg,
        backgroundColor: colors.background.secondary,
        borderRadius: spacing.borderRadius.sm,
        padding: spacing.sm,
    },
    title: {
        marginBottom: spacing.sm,
        color: colors.text.secondary,
        fontSize: 12,
        textAlign: 'center',
    },
    icons: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: spacing.sm,
    },
    iconWrapper: {
        backgroundColor: colors.white,
        borderRadius: spacing.borderRadius.xs,
        padding: spacing.xs,
        width: 50,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: colors.shadow,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
    }
});