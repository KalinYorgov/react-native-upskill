import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
    container: {
        marginTop: 16,
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: 12,
    },
    scrollContent: {
        paddingVertical: 8,
    },
    variationItem: {
        marginRight: 16,
        alignItems: 'center',
    },
    variationImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: colors.border.primary,
    },
    variationColor: {
        marginTop: 8,
        fontSize: 14,
        color: colors.text.secondary,
    },
    selectedVariationItem: {
        opacity: 1,
        transform: [{ scale: 1.1 }],
        shadowColor: colors.primary,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    errorContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background.secondary,
        padding: 4,
    },
});