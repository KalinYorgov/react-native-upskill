import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing.xl,
    },
    message: {
        color: colors.text.secondary,
        textAlign: 'center',
        marginVertical: spacing.lg,
    },
    button: {
        backgroundColor: colors.primary,
        borderRadius: spacing.borderRadius.sm,
        padding: spacing.md,
        paddingHorizontal: spacing.xl,
    },
    buttonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
});