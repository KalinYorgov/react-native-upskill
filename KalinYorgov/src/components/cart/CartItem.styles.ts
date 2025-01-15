import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: colors.white,
        borderRadius: spacing.borderRadius.md,
        padding: spacing.md,
        marginBottom: spacing.md,
        shadowColor: colors.shadow,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: spacing.borderRadius.sm,
        resizeMode: 'cover',
    },
    details: {
        flex: 1,
        marginLeft: spacing.md,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    title: {
        flex: 1,
        marginRight: spacing.sm,
    },
    removeButton: {
        padding: spacing.xs,
    },
    size: {
        color: colors.text.secondary,
        marginVertical: spacing.sm,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 'auto',
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.text.primary,
    },
});