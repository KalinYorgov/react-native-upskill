import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { layout } from '../../theme/layout';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: spacing.screenPadding,
    },
    logoContainer: {
        alignItems: layout.account.center,
        marginTop: spacing.xl,
        marginBottom: spacing.xl,
    },
    formContainer: {
        backgroundColor: colors.background.primary,
        borderRadius: spacing.borderRadius.md,
        padding: spacing.padding.card,
        marginHorizontal: spacing.md,
    },
    title: {
        ...typography.textStyles.screenTitle,
        color: colors.text.primary,
        textAlign: layout.account.center,
        marginBottom: spacing.lg,
    },
    inputContainer: {
        flexDirection: layout.account.row,
        alignItems: layout.account.center,
        backgroundColor: colors.background.secondary,
        borderRadius: spacing.borderRadius.sm,
        marginBottom: spacing.md,
    },
    inputIcon: {
        padding: spacing.sm,
        marginLeft: spacing.sm,
    },
    input: {
        flex: 1,
        paddingVertical: spacing.padding.input,
        paddingHorizontal: spacing.sm,
    },
    inputText: {
        ...typography.textStyles.input,
        color: colors.text.primary,
    },
    authButton: {
        backgroundColor: colors.primary,
        borderRadius: spacing.borderRadius.sm,
        padding: spacing.padding.input,
        alignItems: layout.account.center,
        marginTop: spacing.md,
    },
    logoutButton: {
        backgroundColor: colors.error,
        borderRadius: spacing.borderRadius.sm,
        padding: spacing.padding.input,
        alignItems: layout.account.center,
        marginTop: spacing.xl,
    },
    buttonText: {
        ...typography.textStyles.button,
        color: colors.text.inverse,
    },
    switchModeButton: {
        marginTop: spacing.lg,
        alignItems: layout.account.center,
    },
    switchModeText: {
        ...typography.textStyles.bodyText,
        color: colors.primary,
    },
    settingsTitle: {
        ...typography.textStyles.screenTitle,
        color: colors.text.primary,
        marginBottom: spacing.lg,
    },
    settingsRow: {
        flexDirection: layout.account.row,
        justifyContent: layout.account.spaceBetween,
        alignItems: layout.account.center,
        paddingVertical: spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: colors.border.primary,
    },
    settingsLabel: {
        ...typography.textStyles.bodyText,
        color: colors.text.secondary,
    },
    settingsValue: {
        ...typography.textStyles.bodyText,
        color: colors.text.primary,
    },
    linkButton: {
        backgroundColor: colors.background.secondary,
        borderRadius: spacing.borderRadius.sm,
        padding: spacing.padding.input,
        alignItems: layout.account.center,
        marginTop: spacing.lg,
    },
    linkButtonText: {
        ...typography.textStyles.button,
        color: colors.primary,
    },
    errorText: {
        ...typography.textStyles.bodyText,
        color: colors.error,
        textAlign: 'center',
        marginBottom: spacing.sm,
    },
    authButtonDisabled: {
        opacity: 0.7,
    },
});
