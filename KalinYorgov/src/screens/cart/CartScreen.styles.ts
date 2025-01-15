import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

export const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 80,
    },
    content: {
        flex: 1,
        padding: spacing.md,
    },
    contentWide: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: spacing.xl,
        gap: spacing.xl,
    },
    cartSection: {
        flex: 1,
        marginBottom: spacing.lg,
    },
    cartSectionWide: {
        flex: 0.65,
        marginBottom: 0,
    },
    summarySection: {
        width: '100%',
        marginBottom: spacing.xl,
        marginTop: spacing.lg,
    },
    summarySectionWide: {
        flex: 0.35,
        position: 'relative',
        alignSelf: 'flex-start',
        marginTop: 56,
    },
    sectionTitle: {
        marginBottom: spacing.lg,
        color: colors.text.primary,
        fontSize: 24,
        fontWeight: 'bold',
    },
});
