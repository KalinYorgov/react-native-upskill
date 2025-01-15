import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        borderRadius: spacing.borderRadius.md,
        padding: spacing.lg,
        width: '100%',
        shadowColor: colors.shadow,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        marginBottom: spacing.lg,
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.text.primary,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: spacing.md,
    },
    divider: {
        height: 1,
        backgroundColor: colors.border.primary,
        marginVertical: spacing.lg,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: spacing.lg,
    },
    checkoutButton: {
        backgroundColor: colors.primary,
        borderRadius: spacing.borderRadius.sm,
        padding: spacing.md,
        alignItems: 'center',
        marginTop: spacing.lg,
    },
    checkoutButtonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
});