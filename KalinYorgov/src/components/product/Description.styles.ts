import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

export const styles = StyleSheet.create({
    detailsContainer: {
        padding: 16,
        marginTop: 16,
        borderTopWidth: 1,
        borderTopColor: colors.border.primary,
    },
    section: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: typography.sizes.lg,
        fontWeight: typography.weights.bold,
        color: colors.primary,
        marginBottom: 8,
    },
    description: {
        fontSize: typography.sizes.base,
        lineHeight: 24,
        color: colors.text.primary,
        textAlign: 'left',
    },
    longDescription: {
        overflow: 'hidden',
    },
    collapsed: {
        maxHeight: 200,
    },
    toggleButton: {
        marginTop: 8,
        alignSelf: 'flex-start',
        padding: 4,
    },
    toggleButtonText: {
        color: colors.primary,
        fontSize: typography.sizes.base,
        fontWeight: typography.weights.medium,
    },
});